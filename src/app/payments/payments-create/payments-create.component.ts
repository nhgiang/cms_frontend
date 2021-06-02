import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Payment } from 'types/typemodel';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TValidators } from '@shared/extentions/validators';
import { Ultilities } from '@shared/extentions/Ultilities';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { StorageApiService } from '@shared/api/storage.api.service';
import { switchMap, finalize } from 'rxjs/operators';
import { PaymentsApiService } from '@shared/api/payments.api.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payments-create',
  templateUrl: './payments-create.component.html',
  styleUrls: ['./payments-create.component.scss'],
})
export class PaymentsCreateComponent implements OnInit {
  paymentsForm: FormGroup;
  imageInactive: File;
  isLoading: boolean = false;
  @ViewChild('imageManipulation') canvas: ElementRef;

  constructor(
    private formBuilder: FormBuilder,
    private sanitizer: DomSanitizer,
    private storageApi: StorageApiService,
    private paymentsApi: PaymentsApiService,
    private notif: NzNotificationService,
    private router: Router
  ) {}

  ngOnInit() {
    this.paymentsForm = this.formBuilder.group({
      imageActive: ['', TValidators.required],
      bankName: ['', TValidators.required],
      bankCode: ['', TValidators.required],
      accountNumber: ['', TValidators.required],
      accountName: ['', TValidators.required],
      branch: ['', TValidators.required],
    });
  }

  prepareAndSubmit() {
    Ultilities.validateForm(this.paymentsForm);
    this.isLoading = true;
    let imageActive: File = this.paymentsForm.value.imageActive;
    let img = new Image();
    let tempUrl = URL.createObjectURL(imageActive);
    img.src = tempUrl;
    img.onload = () => {
      this.imageInactive = this.generateInactiveImage(img);
      URL.revokeObjectURL(tempUrl);
      this.submit();
    };
  }

  submit() {
    this.storageApi
      .uploadFiles([this.paymentsForm.value.imageActive, this.imageInactive])
      .pipe(
        switchMap((fileNames) => {
          console.log('examining filenames upon upload: ', fileNames);
          let body = this.paymentsForm.value;
          body.image = fileNames[1];
          body.imageActive = fileNames[0];
          body.method = 'Bank'; //$$to-do enum
          console.log('examining body: ', body);
          return this.paymentsApi.postAppend(body);
        }),
        finalize(() => (this.isLoading = false))
      )
      .subscribe(() => {
        this.notif.success('Thành công', 'Thêm mới thành công');
        this.router.navigate(['/payments']);
      });
  }

  generateInactiveImage(image: HTMLImageElement) {
    let canvas = this.canvas.nativeElement;
    let ctx = canvas.getContext('2d');
    canvas.width = image.naturalWidth;
    canvas.height = image.naturalHeight;
    ctx.drawImage(image, 0, 0);
    let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let data = imageData.data;

    //grayscale algorithm
    for (let i = 0; i < data.length; i += 4) {
      let average = (data[i] + data[i + 1] + data[i + 2]) / 3;
      data[i] = average; //red
      data[i + 1] = average; //green
      data[i + 2] = average; //blue
      data[i + 3] = 255 * 0.6; //alpha channel
    }
    ctx.putImageData(imageData, 0, 0);

    let base64 = canvas.toDataURL();
    let binary = atob(base64.split(',')[1]),
      bytesArr = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) bytesArr[i] = binary.charCodeAt(i);

    return new File([bytesArr], 'inactive-bankimage-unknown', {
      type: 'image/png',
    });
    //to-do: may return pure js link for preview if necessary
  }
}
