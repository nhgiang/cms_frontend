import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SettingApiService, SettingVisibleApiService } from '@shared/api/setting.api.service';
import { StorageApiService } from '@shared/api/storage.api.service';
import { SettingContainer } from '@shared/class/setting-container';
import { Ultilities } from '@shared/extentions/Ultilities';
import { TValidators } from '@shared/extentions/validators';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { forkJoin } from 'rxjs';
import { finalize, switchMap } from 'rxjs/operators';
import { AssetType, SettingKey, SettingKeyEndPoint } from 'types/enums';
import { VideoIntro, VideoIntroContact } from 'types/typemodel';

@Component({
  selector: 'app-video-intro',
  templateUrl: './video-intro.component.html',
  styleUrls: ['./video-intro.component.scss']
})
export class VideoIntroComponent extends SettingContainer<VideoIntroContact> implements OnInit {
  form: FormGroup;
  AssetType = AssetType;
  isloading: boolean;
  
  constructor(
    private fb: FormBuilder,
    private storageApi: StorageApiService,
    settingApi: SettingApiService<VideoIntroContact>,
    SettingVisibleApi: SettingVisibleApiService,
    private notification: NzNotificationService
  ) {
    super(SettingVisibleApi, settingApi, SettingKey.VideoIntroContact, SettingKeyEndPoint.VideoIntroContact);
  }

  submit() {
    Ultilities.validateForm(this.form);
    this.isloading = true;
    forkJoin({
      image: this.storageApi.uploadFile(this.form.value.image),
      video: this.storageApi.uploadFile(this.form.value.video)
    }).pipe(switchMap(({ image, video }) => {
      const data = {
        image,
        video,
        title: this.form.value.title.trim()
      };
      return this.post(data);
    }), finalize(() => this.isloading = false)).subscribe(() => {
      this.notification.success('Thành công', 'Cập nhật thông tin video giới thiệu thành công');
    });
  }

  protected handleResult(result: { res: VideoIntroContact; isVisible: boolean; }) {
    this.form.patchValue(result.res);
    this.isVisible = result.isVisible;
  }
  protected handleResulVisible() {
    throw new Error('Method not implemented.');
  }
  
  protected buildForm() {
    this.form = this.fb.group({
      title: [null, TValidators.required],
      image: [null, Validators.required],
      video: [null]
    });
  }
}
