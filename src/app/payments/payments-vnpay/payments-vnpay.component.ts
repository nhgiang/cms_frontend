import { Component, OnInit } from '@angular/core';
import { VnpayApiService } from '@shared/api/vnpay.api.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { finalize, tap } from 'rxjs/operators';
import { Vnpay } from 'types/typemodel';

@Component({
  selector: 'selector-name',
  templateUrl: './payments-vnpay.component.html',
})
export class PaymentsVnpayComponent implements OnInit {
  isEdit = false;
  secretKey: string;
  tmnCode: string;
  unconfig = true;
  isLoading = false;
  constructor(
    private vnpayApi: VnpayApiService,
    private noti: NzNotificationService
  ) {}

  ngOnInit() {
    this.fetch();
  }

  protected fetch() {
    this.isLoading = true;
    this.vnpayApi
      .get()
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe((data: Vnpay) => {
        if (!data.hashSecret && !data.tmnCode) return;
        this.secretKey = data.hashSecret;
        this.tmnCode = data.tmnCode;
        this.unconfig = false;
      });
  }
  update() {
    this.isLoading = true;
    this.vnpayApi
      .update({ hashSecret: this.secretKey, tmnCode: this.tmnCode })
      .pipe(
        tap(() => {
          this.noti.success(
            'Thành công',
            'Cập nhật thông tin thanh toán thành công!'
          );
          this.vnpayApi.get();
        }),
        finalize(() => (this.isLoading = false))
      )
      .subscribe((data: Vnpay) => {
        this.secretKey = data.hashSecret;
        this.tmnCode = data.tmnCode;
      });
  }
}
