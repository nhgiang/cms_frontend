import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SettingApiService, SettingVisibleApiService } from '@shared/api/setting.api.service';
import { StorageApiService } from '@shared/api/storage.api.service';
import { SettingContainer } from '@shared/class/setting-container';
import { Ultilities } from '@shared/extentions/Ultilities';
import { TValidators } from '@shared/extentions/validators';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { forkJoin } from 'rxjs';
import { finalize, switchMap } from 'rxjs/operators';
import { AssetType, SettingKey, SettingKeyEndPoint } from 'types/enums';
import { VideoIntro } from 'types/typemodel';

@Component({
  selector: 'app-video-intro',
  templateUrl: './video-intro.component.html',
  styleUrls: ['./video-intro.component.scss']
})
export class VideoIntroComponent extends SettingContainer<VideoIntro> implements OnInit {
  form: FormGroup;
  AssetType = AssetType;
  isLoading: boolean;
  isVisible: boolean;

  constructor(
    settingApi: SettingApiService<VideoIntro>,
    settingVisibleApi: SettingVisibleApiService,
    private fb: FormBuilder,
    private storageApi: StorageApiService,
    private notification: NzNotificationService,
  ) {
    super(settingVisibleApi, settingApi, SettingKey.VideoIntro, SettingKeyEndPoint.VideoIntro)
  }

  submit() {
    Ultilities.validateForm(this.form);
    this.isLoading = true;
    forkJoin({
      image: this.storageApi.uploadFile(this.form.value.image),
      video: this.storageApi.uploadFile(this.form.value.video)
    }).pipe(switchMap(({ image, video }) => {
      this.form.get('image').setValue(image);
      this.form.get('video').setValue(video);
      return this.post(this.form.value);
    }), finalize(() => this.isLoading = false)).subscribe((res) => {
      this.form.patchValue(res);
      this.notification.success('Thành công', 'Cập nhật thông tin video giới thiệu thành công');
    });
  }

  protected handleResulVisible() {
    this.notification.success('Thành công', 'Cập nhật thông tin video giới thiệu thành công');
  }

  protected handleResult(result: { res: VideoIntro; isVisible: boolean; }) {
    this.form.patchValue(result.res);
    this.isVisible = result.isVisible;
  }

  protected buildForm() {
    this.form = this.fb.group({
      image: [null, Validators.required],
      video: [null],
      title: [null, TValidators.maxLength(100)]
    });
  }
}

