import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SettingApiService, SettingVisibleApiService } from '@shared/api/setting.api.service';
import { StorageApiService } from '@shared/api/storage.api.service';
import { SettingContainer } from '@shared/class/setting-container';
import { Ultilities } from '@shared/extentions/Ultilities';
import { TValidators } from '@shared/extentions/validators';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { finalize, switchMap } from 'rxjs/operators';
import { AssetType, SettingKey, SettingKeyEndPoint } from 'types/enums';
import { Premium } from 'types/typemodel';

@Component({
  selector: 'app-premiums',
  templateUrl: './premiums.component.html',
  styleUrls: ['./premiums.component.scss']
})
export class PremiumsComponent extends SettingContainer<Premium> implements OnInit {
  form: FormGroup;
  isLoading: boolean;
  premiums: any;
  assetType = AssetType;
  isVisible: boolean;

  constructor(
    private fb: FormBuilder,
    settingApi: SettingApiService<Premium>,
    private notification: NzNotificationService,
    private storageApi: StorageApiService,
    settingVisibleApi: SettingVisibleApiService
  ) {
    super(settingVisibleApi, settingApi, SettingKey.Premium, SettingKeyEndPoint.Premium);
  }

  submit() {
    Ultilities.validateForm(this.form);
    this.isLoading = true;
    this.storageApi.uploadFile(this.form.value.coverAvatar).pipe(
      switchMap(url => {
        this.form.get('coverAvatar').setValue(url);
        return this.post(this.form.value)
      }),
      finalize(() => this.isLoading = false)
    ).subscribe(() => {
      this.notification.success('Thành công', 'Cập nhật cấu hình ưu đãi thành công');
    });
  }

  protected handleResult(result: { res: Premium; isVisible: boolean; }) {
    this.form.patchValue(result.res);
    this.isVisible = result.isVisible
  }
  protected handleResulVisible() {
    throw new Error('Method not implemented.');
  }

  protected buildForm() {
    this.form = this.fb.group({
      discount: [null, [TValidators.onlyNumber(), TValidators.required]],
      course: [null, [TValidators.onlyNumber(), TValidators.required]],
      lession: [null, [TValidators.onlyNumber(), TValidators.required]],
      coverAvatar: [null]
    });
  }
}
