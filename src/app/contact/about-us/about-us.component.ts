import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SettingApiService, SettingVisibleApiService } from '@shared/api/setting.api.service';
import { StorageApiService } from '@shared/api/storage.api.service';
import { SettingContainer } from '@shared/class/setting-container';
import { Ultilities } from '@shared/extentions/Ultilities';
import { TValidators } from '@shared/extentions/validators';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { finalize, switchMap } from 'rxjs/operators';
import { AssetType, SettingKey, SettingKeyEndPoint } from 'types/enums';
import { AboutUs } from 'types/typemodel';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent extends SettingContainer<AboutUs> {
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
    super(settingVisibleApiService, settingApi, SettingKey.AboutUs, SettingKeyEndPoint.AboutUs)
  }

  submit() {
    Ultilities.validateForm(this.form);
    this.isLoading = true;
    this.storageApi.uploadFile(this.form.value.image).pipe(
      switchMap(res => {
        this.form.get('image').setValue(res);
        return this.post(this.form.value);
      }),
      finalize(() => this.isLoading = false)
    ).subscribe((res) => {
      this.form.patchValue(res);
      this.notification.success('Thành công', 'Cập nhật nội dung giới thiệu về chúng tôi thành công!');
    });
  }

  protected handleResult(result: { res: AboutUs; isVisible: boolean; }) {
    this.form.patchValue(result.res);
    this.isVisible = result.isVisible;
  }

  protected handleResulVisible() { }

  protected buildForm() {
    this.form = this.fb.group({
      title: [null],
      image: [null],
      content: [null, [TValidators.textRange(0, 1000)]]
    });
  }
}
