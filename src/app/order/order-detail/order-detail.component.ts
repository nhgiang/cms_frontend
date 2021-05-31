import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { InvoiceApiService } from '@shared/api/invoice.api.service';
import { SettingApiService } from '@shared/api/setting.api.service';
import { Ultilities } from '@shared/extentions/Ultilities';
import { TValidators } from '@shared/extentions/validators';
import { StudentStatusOptions } from '@shared/options/student-status.options';
import { omit } from 'lodash-es';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { finalize } from 'rxjs/operators';
import { InvoiceStatus, InvoiceStatusOptions } from 'types/enums';
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
  isLoading: boolean;
  paymentMethods: any;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private invoiceApi: InvoiceApiService,
    private settingApi: SettingApiService,
    private nzNotification: NzNotificationService
  ) { }

  ngOnInit(): void {
    this.buildForm();
    const id = this.route.snapshot.paramMap.get('id');
    this.invoiceApi.getById(id).subscribe(order => {
      this.order = order;
      this.form.patchValue(order);
    });
    this.settingApi.payment.get().subscribe(res => this.paymentMethods = res);
  }

  submit() {
    Ultilities.validateForm(this.form);
    this.isLoading = true;
    this.invoiceApi.update(this.order.id, this.form.value).pipe(finalize(() => this.isLoading = false)).subscribe(() => {
      this.nzNotification.success('Thành công', 'Cập nhật thông tin đơn hàng thành công!');
    });
  }

  buildForm() {
    this.form = this.fb.group({
      code: this.fb.control({ value: null, disabled: true }, Validators.required),
      bankCode: [null, TValidators.required],
      transactionCode: [null, TValidators.required],
      transactionTime: [null, TValidators.required],
      transactionAmount: [null, [TValidators.required, Validators.maxLength(10)]],
      status: [null, TValidators.required],
    });
  }
}
