import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { SettingApiService } from '@shared/api/setting.api.service';
import { StorageApiService } from '@shared/api/storage.api.service';
import { Ultilities } from '@shared/extentions/Ultilities';
import { TValidators } from '@shared/extentions/validators';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { finalize, switchMap } from 'rxjs/operators';
import { AssetType, SettingKeyEndPoint } from 'types/enums';
import { Footer } from 'types/typemodel';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  form: FormGroup;
  isLoading: boolean;
  assetType = AssetType;

  constructor(
    private fb: FormBuilder,
    private settingApi: SettingApiService<Footer>,
    private notification: NzNotificationService,
    private storageApi: StorageApiService
  ) {
    this.settingApi.setEnpoint(SettingKeyEndPoint.Footer)
  }

  ngOnInit(): void {
    this.buildForm();
    this.settingApi.get().subscribe(res => {
      this.form.patchValue(res);
    });
  }

  buildForm() {
    this.form = this.fb.group({
      address: [null, [TValidators.required]],
      email: [null, [TValidators.emailRules, TValidators.required]],
      phoneNumber: [null, [TValidators.phoneNumber, TValidators.required]],
      facebook: [null, [TValidators.link, TValidators.required]],
      youtube: [null, [TValidators.link, TValidators.required]],
      logoImage: [null]
    });
  }

  submit() {
    Ultilities.validateForm(this.form);
    this.isLoading = true;
    this.storageApi.uploadFile(this.form.value.logoImage).pipe(
      switchMap(url => {
        this.form.get('logoImage').setValue(url);
        return this.settingApi.post(this.form.value)
      }),
      finalize(() => this.isLoading = false)
    ).subscribe(() => {
      this.notification.success('Thành công', 'Cập nhật cấu hình footer thành công');
    });
  }
}
