import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SettingApiService } from '@shared/api/setting.api.service';
import { StorageApiService } from '@shared/api/storage.api.service';
import { Ultilities } from '@shared/extentions/ultilities';
import { TValidators } from '@shared/extentions/validators';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { switchMap } from 'rxjs/operators';
import { AssetType } from 'types/enums';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit {
  form: FormGroup;
  AssetType = AssetType;

  constructor(
    private fb: FormBuilder,
    private storageApi: StorageApiService,
    private settingApi: SettingApiService,
    private notification: NzNotificationService
  ) { }

  ngOnInit() {
    this.buildForm();
    this.settingApi.aboutUs.get().subscribe(res => {
      this.form.patchValue(res)
    });
  }

  submit() {
    Ultilities.validateForm(this.form)
    this.storageApi.uploadFile(this.form.value.image).pipe(
      switchMap(res => {
        const body = {
          ...this.form.value
        };
        body.image = res;
        return this.settingApi.aboutUs.post(body);
      })
    ).subscribe(() => {
      this.notification.success('Thành công', 'Cập nhật nội dung giới thiệu về chúng tôi thành công!')
    })
  }

  buildForm() {
    this.form = this.fb.group({
      title: [null, TValidators.required],
      image: [null, TValidators.required],
      content: [null, TValidators.required]
    })
  }
}
