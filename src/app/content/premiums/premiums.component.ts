import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SettingApiService } from '@shared/api/setting.api.service';
import { Ultilities } from '@shared/extentions/ultilities';
import { TValidators } from '@shared/extentions/validators';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { finalize } from 'rxjs/operators';
import { trimData } from 'utils/common';

@Component({
  selector: 'app-premiums',
  templateUrl: './premiums.component.html',
  styleUrls: ['./premiums.component.scss']
})
export class PremiumsComponent implements OnInit {
  form: FormGroup;
  isLoading: boolean;
  premiums: any;

  constructor(
    private fb: FormBuilder,
    private settingApi: SettingApiService,
    private notification: NzNotificationService
  ) { }

  ngOnInit(): void {
    this.buildForm();
    this.settingApi.premiums.get().subscribe(res => {
      this.form.patchValue(res);
    });
  }

  buildForm() {
    this.form = this.fb.group({
      discount: [null, [TValidators.onlyNumber, TValidators.required]],
      course: [null, [TValidators.onlyNumber, TValidators.required]],
      lession: [null, [TValidators.onlyNumber, TValidators.required]]
    });
  }

  submit() {
    Ultilities.validateForm(this.form);
    this.isLoading = true;
    this.settingApi.premiums.post(trimData(this.form.value)).pipe(
      finalize(() => this.isLoading = false)
    ).subscribe(() => {
      this.notification.success('Thành công', 'Cập nhật cấu hình ưu đãi thành công');
    });
  }
}
