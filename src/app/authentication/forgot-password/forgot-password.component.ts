import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthApiService } from '@shared/api/auth.api.service';
import { Ultilities } from '@shared/extentions/ultilities';
import { TValidators } from '@shared/extentions/validators';
import { finalize } from 'rxjs/operators';
import { trimData } from 'utils/common';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {

  myForm: FormGroup;
  loading = false;
  erroMsg = '';
  constructor(
    private fb: FormBuilder,
    private authApi: AuthApiService,
    private router: Router
  ) {
    this.myForm = this.fb.group({
      email: ['', [TValidators.required, TValidators.emailRules]]
    });
  }

  submitForm(): void {
    Ultilities.validateForm(this.myForm);
    this.loading = true;
    const data = this.myForm.value;
    this.authApi.forgotPassword(trimData(data)).pipe(finalize(() => this.loading = false)).subscribe(() => {
      this.router.navigate(['/authentication/reset-password', this.myForm.value.email]);
    }, () => {
      this.myForm.get('email').setErrors({ notExist: true });
    });
  }
}
