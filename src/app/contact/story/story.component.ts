import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SettingApiService, SettingVisibleApiService } from '@shared/api/setting.api.service';
import { StorageApiService } from '@shared/api/storage.api.service';
import { SettingContainer } from '@shared/class/setting-container';
import { Ultilities } from '@shared/extentions/Ultilities';
import { TValidators } from '@shared/extentions/validators';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { finalize, switchMap } from 'rxjs/operators';
import { SettingKey, SettingKeyEndPoint } from 'types/enums';
import { Story } from 'types/typemodel';

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.scss'],
})
export class StoryComponent extends SettingContainer<Story> {

  form: FormGroup;
  isLoading: boolean;
  constructor(
    private fb: FormBuilder,
    settingApi: SettingApiService<Story>,
    private storageApi: StorageApiService,
    private notification: NzNotificationService,
    settingVisibleApiService: SettingVisibleApiService
  ) {
    super(settingVisibleApiService, settingApi, SettingKey.Story, SettingKeyEndPoint.Story);
  }

  protected buildForm(): void {
    this.form = this.fb.group({
      images: [null, [TValidators.minLength(3)]],
      content: [null, [TValidators.maxLength(1000)]]
    });
  }

  protected handleResult(result: { res: Story; isVisible: boolean; }) {
    this.form.patchValue(result.res);
    this.isVisible = result.isVisible;
  }

  protected handleResulVisible() {
    this.notification.success('Thành công', 'Cập nhật thông tin câu chuyện thành công');
  }

  submit() {
    Ultilities.validateForm(this.form);
    this.isLoading = true;
    this.storageApi.uploadFiles(this.form.value.images).pipe(
      switchMap(res => {
        this.form.get('images').setValue(res);
        return this.post(this.form.value);
      }),
      finalize(() => this.isLoading = false)
    ).subscribe((res) => {
      this.form.patchValue(res);
      this.notification.success('Thành công', 'Cập nhật nội dung thông tin liên hệ thành công!');
    });
  }
}
