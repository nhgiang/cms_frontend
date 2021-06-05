import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { PaymentsApiService } from '@shared/api/payments.api.service';
import { StorageApiService } from '@shared/api/storage.api.service';
import { Ultilities } from '@shared/extentions/Ultilities';
import { TValidators } from '@shared/extentions/validators';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { finalize, switchMap } from 'rxjs/operators';
import { Payment } from 'types/typemodel';

@Component({
  selector: 'app-payments-create',
  templateUrl: './payments-create.component.html',
  styleUrls: ['./payments-create.component.scss'],
})
export class PaymentsCreateComponent implements OnInit {
  paymentsForm: FormGroup;
  imageInactive: any = null;
  isLoading = false;
  @ViewChild('imageManipulation') canvas: ElementRef;
  targetEdit: Payment = null;
  paymentsList: Payment[];

  constructor(
    private formBuilder: FormBuilder,
    private storageApi: StorageApiService,
    private paymentsApi: PaymentsApiService,
    private notif: NzNotificationService,
    private router: Router
  ) {
    const targetEditIndex =
      this.router.getCurrentNavigation().extras.state?.targetEditIndex;
    this.isLoading = true;
    this.paymentsApi.getList().subscribe((data: Payment[]) => {
      this.paymentsList = data;
      if (targetEditIndex !== undefined) {
        this.targetEdit = this.paymentsList[targetEditIndex];
        this.paymentsForm.patchValue(this.targetEdit);
        this.imageInactive = this.targetEdit.image;
      }
      this.isLoading = false;
      // chỉ loading = true khi thành công, ngăn người dùng nhập mới ở khi edit
    });
  }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
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
    if (typeof this.paymentsForm.value.imageActive !== 'object') {
      this.submit();
      return;
    }
    const imageActive: File = this.paymentsForm.value.imageActive;
    const img = new Image();
    const tempUrl = URL.createObjectURL(imageActive);
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
          const thisPayment = this.paymentsForm.value;
          thisPayment.image = fileNames[1];
          thisPayment.imageActive = fileNames[0];
          thisPayment.method = 'Bank'; // $$to-do add Vnpay

          if (this.targetEdit) {
            this.paymentsList[this.paymentsList.indexOf(this.targetEdit)] =
              thisPayment;
          } else {
            this.paymentsList = [...this.paymentsList, thisPayment];
          }
          return this.paymentsApi.postWhole(this.paymentsList);
        }),
        finalize(() => (this.isLoading = false))
      )
      .subscribe(() => {
        this.notif.success('Thành công', 'Cập nhật thành công');
        this.router.navigate(['/payments']);
      });
  }

  generateInactiveImage(image: HTMLImageElement) {
    const canvas = this.canvas.nativeElement;
    const ctx = canvas.getContext('2d');
    canvas.width = image.naturalWidth;
    canvas.height = image.naturalHeight;
    ctx.drawImage(image, 0, 0);
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    // grayscale algorithm
    for (let i = 0; i < data.length; i += 4) {
      const average = (data[i] + data[i + 1] + data[i + 2]) / 3;
      data[i] = average; // red
      data[i + 1] = average; // green
      data[i + 2] = average; // blue
      data[i + 3] = 255 * 0.6; // alpha channel
    }
    ctx.putImageData(imageData, 0, 0);

    const base64 = canvas.toDataURL();
    const binary = atob(base64.split(',')[1]);
    const  bytesArr = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) { bytesArr[i] = binary.charCodeAt(i); }

    return new File([bytesArr], 'inactive-bankimage-unknown', {
      type: 'image/png',
    });
    // to-do: may return pure js link for preview if necessary
  }
}
