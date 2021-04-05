import { Ultilities } from '@shared/extentions/ultilities';
import { TValidators } from '@shared/extentions/validators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthApiService } from '@shared/api/auth.api.service';
import { ActivatedRoute } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { finalize } from 'rxjs/operators';
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  myForm: FormGroup;
  loading = false;
  isPasswordVisible = false;
  isConfirmPasswordVisible = false;
  email: string;

  constructor(
    private fb: FormBuilder,
    private authApi: AuthApiService,
    private route: ActivatedRoute,
    private notification: NzNotificationService
  ) {
  }

  ngOnInit() {
    this.email = this.route.snapshot.paramMap.get('email');
    this.buildForm();
  }

  submitForm(): void {
    Ultilities.validateForm(this.myForm);
    this.loading = true;
    const data = {
      newPassword: this.myForm.value.password,
      otp: this.myForm.value.code,
      email: this.email
    };

    this.authApi.resetPassword(data).pipe(finalize(() => this.loading = false)).subscribe(res => {
      this.notification.success('Thành công', 'Cập nhật mật khẩu thành công!');
    });
  }

  resendOtp() {
    this.authApi.resendOTP({ email: this.email }).subscribe(res => {
      this.notification.success('Thành công', 'Gửi mã OTP thành công. Hãy kiểm tra email để nhận mã!');
    });
  }

  buildForm() {
    this.myForm = this.fb.group({
      code: ['', [TValidators.required]],
      password: ['', [TValidators.required, TValidators.passwordRules]],
      confirmPassword: ['', [TValidators.required]]
    }, { validators: [TValidators.confirmPasswordValidator] });
  }
}
