import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { SettingApiService } from '@shared/api/setting.api.service';
import { Ultilities } from '@shared/extentions/ultilities';
import { TValidators } from '@shared/extentions/validators';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  form: FormGroup;
  isLoading: boolean;
  constructor(
    private fb: FormBuilder,
    private settingApi: SettingApiService,
    private notification: NzNotificationService
  ) { }

  ngOnInit(): void {
    this.buildForm();
    this.settingApi.footer.get().subscribe(res => {
      this.form.patchValue(res);
    });
  }

  buildForm() {
    this.form = this.fb.group({
      address: [null, [TValidators.required]],
      email: [null, [TValidators.email, TValidators.required]],
      phoneNumber: [null, [TValidators.onlyNumber, TValidators.required]],
      facebook: [null, [TValidators.link, TValidators.required]],
      youtube: [null, [TValidators.link, TValidators.required]]
    });
  }

  submit() {
    Ultilities.validateForm(this.form);
    this.isLoading = true;
    this.settingApi.footer.post(this.form.value).pipe(
      finalize(() => this.isLoading = false)
    ).subscribe(() => {
      this.notification.success('Thành công', 'Cập nhật cấu hình footer thành công');
    });
  }
}
