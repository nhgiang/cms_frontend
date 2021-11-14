import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SettingApiService, SettingVisibleApiService } from '@shared/api/setting.api.service';
import { StorageApiService } from '@shared/api/storage.api.service';
import { SettingContainer } from '@shared/class/setting-container';
import { Ultilities } from '@shared/extentions/ultilities';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { finalize, switchMap } from 'rxjs/operators';
import { SettingKey, SettingKeyEndPoint } from 'types/enums';

@Component({
  selector: 'app-partner',
  templateUrl: './partner.component.html',
  styleUrls: ['./partner.component.scss']
})
export class PartnerComponent extends SettingContainer<any> {
  form: FormGroup;
  logos: string[];
  constructor(
    settingApi: SettingApiService<any>,
    settingVisibleApiService: SettingVisibleApiService,
    private fb: FormBuilder,
    private storageApi: StorageApiService,
    private notification: NzNotificationService
  ) {
    super(settingVisibleApiService, settingApi, SettingKey.Partner, SettingKeyEndPoint.Partner);
  }

  protected handleResult(result: { res: any; isVisible: boolean; }) {
    this.form.patchValue({ images: result.res });
    this.isVisible = result.isVisible;
  }
  protected buildForm(): void {
    this.form = this.fb.group({
      images: []
    });
  }
  protected handleResulVisible() {
    throw new Error('Method not implemented.');
  }

  submit() {
    Ultilities.validateForm(this.form);
    this.isLoading = true;
    this.storageApi.uploadFiles(this.form.value.images).pipe(
      switchMap(res => {
        this.form.get('images').setValue(res);
        return this.post(this.form.value.images);
      }),
      finalize(() => this.isLoading = false)
    ).subscribe((res) => {
      this.form.patchValue(res);
      this.notification.success('Thành công', 'Cập nhật logo đối tác thành công!');
    });
  }
}
