import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { InvoiceApiService } from '@shared/api/invoice.api.service';
import { SettingApiService } from '@shared/api/setting.api.service';
import { Ultilities } from '@shared/extentions/Ultilities';
import { TValidators } from '@shared/extentions/validators';
import { StudentStatusOptions } from '@shared/options/student-status.options';
import { omitBy } from 'lodash-es';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { finalize } from 'rxjs/operators';
import { InvoiceStatus, InvoiceStatusOptions, InvoiceType } from 'types/enums';
import { Invoice } from 'types/typemodel';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {
  form: FormGroup;
  order: Invoice;
  StudentStatusOptions = StudentStatusOptions;
  invoiceStatusOptions = InvoiceStatusOptions;
  invoiceStatus = InvoiceStatus;
  invoiceType = InvoiceType;
  isLoading: boolean;
  paymentMethods: any;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private invoiceApi: InvoiceApiService,
    private settingApi: SettingApiService,
    private nzNotification: NzNotificationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.buildForm();
    const id = this.route.snapshot.paramMap.get('id');
    this.invoiceApi.getById(id).subscribe(order => {
      this.order = order;
      this.form.patchValue({
        code: order.code,
        bankCode: order.bankCode || order.bankCodePicked,
        transactionCode: order.transactionCode,
        transactionTime: order.transactionTime,
        transactionAmount: order.transactionAmount ?? order.totalPrice,
        status: order.status,
        note: order.note
      }, { emitEvent: false });
      if (this.order.status === this.invoiceStatus.Success) {
        this.form.get('status').disable();
      }
    });
    this.settingApi.payment.get().subscribe(res => this.paymentMethods = res);
    this.form.get('status').valueChanges.subscribe(val => {
      if (val !== this.invoiceStatus.Success) {
        // tslint:disable-next-line: forin
        for (const key in this.form.controls) {
          this.form.controls[key].setErrors(null);
        }
      }
    });
  }

  submit() {
    if (this.form.value.status === this.invoiceStatus.Success) {
      Ultilities.validateForm(this.form);
    }
    this.isLoading = true;
    this.invoiceApi.update(this.order.id, omitBy(this.form.getRawValue(), 'code')).pipe(
      finalize(() => this.isLoading = false)
    ).subscribe(() => {
      this.nzNotification.success('Thành công', 'Cập nhật thông tin đơn hàng thành công!');
      this.router.navigate(['../'], { relativeTo: this.route });
    });
  }

  buildForm() {
    this.form = this.fb.group({
      code: this.fb.control({ value: null, disabled: true }, Validators.required),
      bankCode: [null, TValidators.required],
      transactionCode: [null, Validators.required],
      transactionTime: [null, Validators.required],
      transactionAmount: [null, [Validators.required, TValidators.maxLength(10), TValidators.onlyNumber()]],
      status: [null, Validators.required],
      note: [null]
    });
  }
}
