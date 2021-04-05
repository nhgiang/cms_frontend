import { Ultilities } from '@shared/extentions/ultilities';
import { TValidators } from '@shared/extentions/validators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { AuthApiService } from '@shared/api/auth.api.service';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';

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
      email: ['', [TValidators.required, Validators.email]]
    });
  }

  submitForm(): void {
    Ultilities.validateForm(this.myForm);
    this.loading = true;
    this.authApi.forgotPassword(this.myForm.value).pipe(finalize(() => this.loading = false)).subscribe(() => {
      this.router.navigate(['/authentication/reset-password', this.myForm.value.email]);
    }, () => {
      this.myForm.get('email').setErrors({ notExist: true });
    });
  }
}
