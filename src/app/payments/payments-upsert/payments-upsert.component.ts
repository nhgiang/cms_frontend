import {
  Component,
  ElementRef,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Payment } from 'types/typemodel';
import { FormGroup, FormBuilder } from '@angular/forms';
import { TValidators } from '@shared/extentions/validators';
import { Ultilities } from '@shared/extentions/Ultilities';
import { StorageApiService } from '@shared/api/storage.api.service';
import { switchMap, finalize } from 'rxjs/operators';
import { PaymentsApiService } from '@shared/api/payments.api.service';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-payments-upsert',
  templateUrl: './payments-upsert.component.html',
})
export class PaymentsUpsertComponent implements OnInit {
  paymentsForm: FormGroup;
  imageInactive: any = null;
  isLoading = false;
  @ViewChild('imageManipulation') canvas: ElementRef;

  @Input() targetEditIndex: number;
  @Input() paymentsList: Payment[];
  @Output() success: EventEmitter<any> = new EventEmitter();

  constructor(
    private formBuilder: FormBuilder,
    private storageApi: StorageApiService,
    private paymentsApi: PaymentsApiService
  ) {}

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    const targetEdit =
      this.targetEditIndex === null
        ? null
        : this.paymentsList[this.targetEditIndex];
    this.paymentsForm = this.formBuilder.group({
      imageActive: [targetEdit?.imageActive, TValidators.required],
      bankName: [targetEdit?.bankName, TValidators.required],
      bankCode: [targetEdit?.bankCode, TValidators.required],
      accountNumber: [
        targetEdit?.accountNumber,
        [TValidators.required, TValidators.onlyNumber()],
      ],
      accountName: [targetEdit?.accountName, TValidators.required],
      branch: [targetEdit?.branch, TValidators.required],
    });
    this.imageInactive = targetEdit?.image;
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
          thisPayment.method = 'Bank';

          if (this.targetEditIndex !== null) {
            this.paymentsList[this.targetEditIndex] = thisPayment;
          } else {
            this.paymentsList = [...this.paymentsList, thisPayment];
          }
          return this.paymentsApi.postWhole(this.paymentsList);
        }),
        finalize(() => (this.isLoading = false))
      )
      .subscribe(() => {
        this.success.emit();
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

    //grayscale algorithm
    for (let i = 0; i < data.length; i += 4) {
      const average = (data[i] + data[i + 1] + data[i + 2]) / 3;
      data[i] = average; //red
      data[i + 1] = average; //green
      data[i + 2] = average; //blue
      data[i + 3] = 255 * 0.6; //alpha channel
    }
    ctx.putImageData(imageData, 0, 0);

    const base64 = canvas.toDataURL();
    const binary = atob(base64.split(',')[1]);
    const bytesArr = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytesArr[i] = binary.charCodeAt(i);
    }

    return new File([bytesArr], 'inactive-bankimage-unknown', {
      type: 'image/png',
    });
    //to-do: may return pure js link for preview if necessary
  }
}
