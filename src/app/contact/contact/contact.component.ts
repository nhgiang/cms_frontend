import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SettingApiService, SettingVisibleApiService } from '@shared/api/setting.api.service';
import { StorageApiService } from '@shared/api/storage.api.service';
import { SettingContainer } from '@shared/class/setting-container';
import { Ultilities } from '@shared/extentions/ultilities';
import { TValidators } from '@shared/extentions/validators';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { finalize, switchMap } from 'rxjs/operators';
import { AssetType, SettingKey, SettingKeyEndPoint } from 'types/enums';
import { AboutUs } from 'types/typemodel';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactsComponent extends SettingContainer<AboutUs> {

  form: FormGroup;
  AssetType = AssetType;
  isEdit: boolean;
  isLoading: boolean;

  constructor(
    private fb: FormBuilder,
    private storageApi: StorageApiService,
    settingApi: SettingApiService<AboutUs>,
    private notification: NzNotificationService,
    settingVisibleApiService: SettingVisibleApiService
  ) {
    super(settingVisibleApiService, settingApi, SettingKey.Contact, SettingKeyEndPoint.Contact);
  }

  submit() {
    Ultilities.validateForm(this.form);
    this.isLoading = true;
    this.storageApi.uploadFile(this.form.value.coverAvatar).pipe(
      switchMap(res => {
        this.form.get('coverAvatar').setValue(res);
        return this.post(this.form.value);
      }),
      finalize(() => this.isLoading = false)
    ).subscribe((res) => {
      this.form.patchValue(res);
      this.notification.success('Thành công', 'Cập nhật thông tin liên hệ thành công!');
    });
  }

  protected handleResulVisible() {
    this.notification.success('Thành công', 'Cập nhật thông tin liên hệ thành công');
  }

  protected handleResult(result: { res: AboutUs; isVisible: boolean; }) {
    this.form.patchValue(result.res);
    this.isVisible = result.isVisible;
  }

  protected buildForm() {
    this.form = this.fb.group({
      coverAvatar: [null],
      companyName: [null, [TValidators.required, TValidators.maxLength(200)]],
      address: [null, [TValidators.required, TValidators.maxLength(200)]],
      email: [null, [TValidators.required, TValidators.emailRules, TValidators.maxLength(200)]],
      phoneNumber: [null, [TValidators.required, TValidators.phoneNumber]]
    });
  }
}
