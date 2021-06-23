import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SettingApiService } from '@shared/api/setting.api.service';
import { Ultilities } from '@shared/extentions/Ultilities';
import { TValidators } from '@shared/extentions/validators';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { finalize } from 'rxjs/operators';
import { SettingKeyEndPoint } from 'types/enums';

@Component({
  selector: 'app-config-quick-contact',
  templateUrl: './config-quick-contact.component.html',
  styleUrls: ['./config-quick-contact.component.scss']
})
export class ConfigQuickContactComponent implements OnInit {
  form: FormGroup;
  isLoading: boolean;
  constructor(
    private fb: FormBuilder,
    private settingApi: SettingApiService<{ fanpageId: string }>,
    private notification: NzNotificationService
  ) {
    this.settingApi.setEnpoint(SettingKeyEndPoint.ChatFacebook)
  }

  ngOnInit(): void {
    this.buildform();
    this.settingApi.get().subscribe(res => {
      this.form.patchValue(res);
    });
  }

  submit() {
    Ultilities.validateForm(this.form);
    this.isLoading = true;
    this.settingApi.post(this.form.value).pipe(finalize(() => this.isLoading = false)).subscribe(() => {
      this.notification.success('Thành công', 'Cập nhật Fanpage ID thành công');
    });
  }

  buildform() {
    this.form = this.fb.group({
      fanpageId: [null, [TValidators.maxLength(20), TValidators.onlyNumber()]]
    });
  }
}
