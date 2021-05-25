import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SettingApiService } from '@shared/api/setting.api.service';
import { StorageApiService } from '@shared/api/storage.api.service';
import { Ultilities } from '@shared/extentions/Ultilities';
import { TValidators } from '@shared/extentions/validators';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { finalize, switchMap } from 'rxjs/operators';
import { AssetType } from 'types/enums';
import { trimData } from 'utils/common';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit {
  form: FormGroup;
  AssetType = AssetType;
  isEdit: boolean;
  isLoading: boolean;
  constructor(
    private fb: FormBuilder,
    private storageApi: StorageApiService,
    private settingApi: SettingApiService,
    private notification: NzNotificationService
  ) { }

  ngOnInit() {
    this.buildForm();
    this.settingApi.aboutUs.get().subscribe(res => {
      this.form.patchValue(res);
    });
  }

  submit() {
    if (this.isEdit) {
      Ultilities.validateForm(this.form);
      this.isLoading = true;
      this.storageApi.uploadFile(this.form.value.image).pipe(
        switchMap(res => {
          const body = {
            ...this.form.value
          };
          body.image = res;
          return this.settingApi.aboutUs.post(trimData(body));
        }),
        finalize(() => this.isLoading = false)
      ).subscribe(() => {
        this.notification.success('Thành công', 'Cập nhật nội dung giới thiệu về chúng tôi thành công!');
      });
    }
    this.isEdit = !this.isEdit;
  }

  buildForm() {
    this.form = this.fb.group({
      title: [null, TValidators.required],
      image: [null, TValidators.required],
      content: [null, [TValidators.textRange(0, 1000), TValidators.required]]
    });
  }
}
