import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SettingApiService, SettingVisibleApiService } from '@shared/api/setting.api.service';
import { StorageApiService } from '@shared/api/storage.api.service';
import { SettingContainer } from '@shared/class/setting-container';
import { Ultilities } from '@shared/extentions/Ultilities';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { finalize, switchMap } from 'rxjs/operators';
import { AssetType, SettingKey, SettingKeyEndPoint } from 'types/enums';
import { Header, QuestionAnswer } from 'types/typemodel';

@Component({
  selector: 'app-setting-header',
  templateUrl: './setting-header.component.html',
  styleUrls: ['./setting-header.component.scss']
})
export class SettingHeaderComponent extends SettingContainer<Header> implements OnInit {
  form: FormGroup;
  assetType = AssetType;
  constructor(
    private fb: FormBuilder,
    settingApi: SettingApiService<Header>,
    settingVisibleApi: SettingVisibleApiService,
    private notification: NzNotificationService,
    private storageApi: StorageApiService
  ) {
    super(settingVisibleApi, settingApi, SettingKey.HomepageHeader, SettingKeyEndPoint.HomepageHeader);
  }

  submit() {
    Ultilities.validateForm(this.form)
    this.isLoading = true;
    this.storageApi.uploadFile(this.form.value.logoImage).pipe(
      switchMap(url => {
        this.form.get('logoImage').setValue(url);
        return this.post(this.form.value)
      }),
      finalize(() => this.isLoading = false)
    ).subscribe(()=> {
      this.notification.success('Thành công','Cập nhật thông tin header thành công')
    })

  }

  protected handleResult(result: { res: Header; isVisible: boolean; }) {
    this.form.patchValue(result.res);
  }
  protected buildForm(): void {
    this.form = this.fb.group({
      logoImage: [null, Validators.required]
    })
  }
  protected handleResulVisible() {
    throw new Error('Method not implemented.');
  }
}
