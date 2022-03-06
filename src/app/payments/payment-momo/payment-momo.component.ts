import { Component, OnInit } from '@angular/core';
import { SettingApiService } from '@shared/api/setting.api.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { finalize, tap } from 'rxjs/operators';
import { SettingKeyEndPoint } from 'types/enums';

@Component({
  selector: 'app-payment-momo',
  templateUrl: './payment-momo.component.html',
  styleUrls: ['./payment-momo.component.scss']
})
export class PaymentMomoComponent implements OnInit {
  isEdit = false;
  secretKey: string;
  partnerCode: string;
  accessKey: string;
  unconfig = true;
  isLoading = false;
  constructor(
    private settingApi: SettingApiService<any>,
    private noti: NzNotificationService
  ) {
    this.settingApi.setEnpoint(SettingKeyEndPoint.MoMo)
  }

  ngOnInit() {
    this.fetch();
  }

  protected fetch() {
    this.isLoading = true;
    this.settingApi
      .get()
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe((data: any) => {
        if (Object.values(data).every(t => t === null)) { return; }
        this.secretKey = data.secretKey;
        this.partnerCode = data.partnerCode;
        this.accessKey = data.accessKey;
        this.unconfig = false;
      });
  }
  update() {
    this.isLoading = true;
    this.settingApi
      .post({ secretKey: this.secretKey, partnerCode: this.partnerCode, accessKey: this.accessKey })
      .pipe(
        tap(() => {
          this.noti.success(
            'Thành công',
            'Cập nhật thông tin thanh toán thành công!'
          );
          this.settingApi.get();
        }),
        finalize(() => (this.isLoading = false))
      )
      .subscribe((data: any) => {
        this.secretKey = data.secretKey;
        this.partnerCode = data.partnerCode;
        this.accessKey = data.accessKey
      });
  }
}
