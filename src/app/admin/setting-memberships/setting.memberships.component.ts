import { formatNumber } from '@angular/common';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SettingMembershipsApiService } from '@shared/api/setting-memberships.api.service';
import { Ultilities } from '@shared/extentions/Ultilities';
import { TValidators } from '@shared/extentions/validators';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-setting-memberships',
  templateUrl: 'setting-memberships.component.html',
})
export class SettingMembershipsComponent implements OnInit {
  @ViewChild('drawer') drawer: TemplateRef<any>;
  form: FormGroup;
  isDataLoading = false;
  constructor(
    private drawerService: NzDrawerService,
    private fb: FormBuilder,
    private settingMembershipsApi: SettingMembershipsApiService,
    private notif: NzNotificationService
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      price: ['', [TValidators.required]],
      royaltyPercentage: [
        '',
        [TValidators.required, TValidators.numberRange(0, 100)], //inclusive
      ],
      days: ['', [TValidators.required]],
      courseDays: ['', [TValidators.required]],
    });
    this.fetch();
  }

  protected fetch() {
    this.isDataLoading = true;
    this.settingMembershipsApi
      .get()
      .pipe(finalize(() => (this.isDataLoading = false)))
      .subscribe((value) => this.form.patchValue(value));
  }

  submit() {
    Ultilities.validateForm(this.form);

    this.settingMembershipsApi
      .post({
        price: parseFloat(this.form.controls['price'].value),
        royaltyPercentage: parseFloat(
          this.form.controls['royaltyPercentage'].value
        ),
        days: parseFloat(this.form.controls['days'].value),
        courseDays: parseFloat(this.form.controls['courseDays'].value),
      })
      .subscribe(() => {
        this.fetch();
        this.notif.success(
          'Thành công',
          'Cập nhật thông tin gói membership thành công!'
        );
      });
  }
  toggleDrawer() {
    this.drawerService.create({
      nzContent: this.drawer,
      nzWidth: 400,
    });
  }
}
