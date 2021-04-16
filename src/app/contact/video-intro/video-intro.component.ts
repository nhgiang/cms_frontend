import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { SettingApiService } from '@shared/api/setting.api.service';
import { StorageApiService } from '@shared/api/storage.api.service';
import { Ultilities } from '@shared/extentions/ultilities';
import { TValidators } from '@shared/extentions/validators';
import { forkJoin } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AssetType } from 'types/enums';
import { VideoIntro } from 'types/typemodel';

@Component({
  selector: 'app-video-intro',
  templateUrl: './video-intro.component.html',
  styleUrls: ['./video-intro.component.scss']
})
export class VideoIntroComponent implements OnInit {
  form: FormGroup;
  AssetType = AssetType;
  isloading: boolean
  constructor(
    private fb: FormBuilder,
    private storageApi: StorageApiService,
    private settingApi: SettingApiService
  ) { }

  ngOnInit(): void {
    this.buildForm();
    this.settingApi.videoIntroContact.get().subscribe((res: VideoIntro) => {
      this.form.patchValue(res);
    });
  }

  buildForm() {
    this.form = this.fb.group({
      title: [null, TValidators.required],
      image: [null, TValidators.required],
      video: [null]
    });
  }

  submit() {
    Ultilities.validateForm(this.form);

    forkJoin({
      image: this.storageApi.uploadFile(this.form.value.image),
      video: this.storageApi.uploadFile(this.form.value.video)
    }).pipe(switchMap(({ image, video }) => {
      const data = {
        image,
        video,
        title: this.form.value.title.trim()
      };
      return this.settingApi.videoIntroContact.post(data);
    })).subscribe(res => {
      this
    });
  }
}
