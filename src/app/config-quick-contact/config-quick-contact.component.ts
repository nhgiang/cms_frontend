import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SettingApiService } from '@shared/api/setting.api.service';
import { Ultilities } from '@shared/extentions/Ultilities';
import { TValidators } from '@shared/extentions/validators';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { finalize } from 'rxjs/operators';

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
    private settingApi: SettingApiService,
    private notification: NzNotificationService
  ) { }

  ngOnInit(): void {
    this.buildform();
    this.settingApi.chatFacebook.get().subscribe(res => {
      this.form.patchValue(res);
    });
  }

  submit() {
    Ultilities.validateForm(this.form);
    this.isLoading = true;
    this.settingApi.chatFacebook.post(this.form.value).pipe(finalize(() => this.isLoading = false)).subscribe(() => {
      this.notification.success('Thành công', 'Cập nhật Fanpage ID thành công');
    });
  }

  buildform() {
    this.form = this.fb.group({
      fanpageId: [null, [TValidators.maxLength(20), TValidators.onlyNumber()]]
    });
  }
}
