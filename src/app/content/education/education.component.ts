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
import { Education } from 'types/typemodel';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss']
})
export class EducationComponent extends SettingContainer<Education> implements OnInit {
  form: FormGroup;
  assetType = AssetType;

  constructor(
    private fb: FormBuilder,
    settingApi: SettingApiService<Education>,
    settingVisibleApi: SettingVisibleApiService,
    private notification: NzNotificationService,
    private storageApi: StorageApiService
  ) {
    super(settingVisibleApi, settingApi, SettingKey.HomepageEducation, SettingKeyEndPoint.HomepageEducation);
  }

  submit() {
    this.isLoading = true;
    this.storageApi.uploadFile(this.form.value.coverAvatar).pipe(
      switchMap(url => {
        this.form.get('coverAvatar').setValue(url);
        return this.post(this.form.value);
      }),
      finalize(() => this.isLoading = false)
    ).subscribe(() => this.notification.success('Thành công', 'Cập nhật nội dung hệ thống khóa học thành công!'));
  }

  protected handleResult(result: { res: Education; isVisible: boolean; }) {
    this.form.patchValue(result.res);
    this.isVisible = result.isVisible;
  }

  protected buildForm(): void {
    this.form = this.fb.group({
      coverAvatar: [null]
    })
  }

  protected handleResulVisible() {
    this.notification.success('Thành công', 'Cập nhật nội dung hệ thống khóa học thành công!');
  }
}
