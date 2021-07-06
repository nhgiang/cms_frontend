import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthApiService } from '@shared/api/auth.api.service';
import { Ultilities } from '@shared/extentions/ultilities';
import { TValidators } from '@shared/extentions/validators';
import { NzDrawerRef } from 'ng-zorro-antd/drawer';
import { NzNotificationService } from 'ng-zorro-antd/notification';
@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
})
export class ChangePasswordComponent implements OnInit {
  pwChangeForm: FormGroup;

  currentPwVisible = false;
  pwVisible = false;
  confirmPwVisible = false;
  constructor(
    private fb: FormBuilder,
    private drawerRef: NzDrawerRef,
    private authApi: AuthApiService,
    private noti: NzNotificationService
  ) {}

  ngOnInit() {
    this.pwChangeForm = this.fb.group(
      {
        currentPassword: [
          '',
          [TValidators.required, TValidators.passwordRules],
        ],
        password: ['', [TValidators.required, TValidators.passwordRules]],
        confirmPassword: ['', TValidators.required],
      },
      { validators: [TValidators.confirmPasswordValidator] }
    );
  }
  close() {
    this.drawerRef.close();
  }
  submit() {
    Ultilities.validateForm(this.pwChangeForm);
    this.authApi
      .changePassword({
        oldPassword: this.pwChangeForm.value.currentPassword,
        newPassword: this.pwChangeForm.value.password,
      })
      .subscribe(() => {
        this.noti.success('Thành công', 'Thay đổi mật khẩu thành công');
        this.close();
      });
  }
}
