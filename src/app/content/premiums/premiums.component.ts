import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SettingApiService } from '@shared/api/setting.api.service';
import { StorageApiService } from '@shared/api/storage.api.service';
import { Ultilities } from '@shared/extentions/Ultilities';
import { TValidators } from '@shared/extentions/validators';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { finalize, switchMap } from 'rxjs/operators';
import { AssetType } from 'types/enums';
import { trimData } from 'utils/common';

@Component({
  selector: 'app-premiums',
  templateUrl: './premiums.component.html',
  styleUrls: ['./premiums.component.scss']
})
export class PremiumsComponent implements OnInit {
  form: FormGroup;
  isLoading: boolean;
  premiums: any;
  assetType = AssetType;

  constructor(
    private fb: FormBuilder,
    private settingApi: SettingApiService,
    private notification: NzNotificationService,
    private storageApi: StorageApiService
  ) { }

  ngOnInit(): void {
    this.buildForm();
    this.settingApi.premiums.get().subscribe(res => {
      this.form.patchValue(res);
    });
  }

  buildForm() {
    this.form = this.fb.group({
      discount: [null, [TValidators.onlyNumber(), TValidators.required]],
      course: [null, [TValidators.onlyNumber(), TValidators.required]],
      lession: [null, [TValidators.onlyNumber(), TValidators.required]],
      isShow: [false],
      image: [null]
    });
  }

  submit() {
    Ultilities.validateForm(this.form);
    this.isLoading = true;
    this.storageApi.uploadFile(this.form.value.image).pipe(
      switchMap(url => {
        this.form.get('image').setValue(url);
        return this.settingApi.premiums.post(this.form.value)
      }),
      finalize(() => this.isLoading = false)
    ).subscribe(() => {
      this.notification.success('Thành công', 'Cập nhật cấu hình ưu đãi thành công');
    });
  }
}
