import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Ultilities } from '@shared/extentions/Ultilities';
import { TValidators } from '@shared/extentions/validators';
import { AuthenticationService } from '@shared/services/authentication.service';
import { finalize } from 'rxjs/operators';
import { trimData } from 'utils/common';
@Component({
  templateUrl: './login.component.html'
})
export class LoginComponent {
  myForm: FormGroup;
  loading = false;
  isPasswordVisible = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private router: Router
  ) {
    this.myForm = this.fb.group({
      email: [null, [TValidators.required, TValidators.emailRules]],
      password: [null, [TValidators.required]],
      isRemember: [null]
    });
  }

  submitForm(): void {
    Ultilities.validateForm(this.myForm);
    this.loading = true;
    const data = {
      email: this.myForm.value.email,
      password: this.myForm.value.password
    };
    this.authService.login(trimData(data))
      .pipe(
        finalize(() => this.loading = false))
      .subscribe(({ accessToken, refreshToken }) => {
        localStorage.setItem('token', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        if (this.myForm.value.isRemember) {
          this.storePassword(data).then();
        }
        this.router.navigate(['/']);
      });
  }

  private async storePassword(body: { email: string, password: string }): Promise<Credential | null> {
    // @ts-ignore
    if (!window.PasswordCredential) {
      return Promise.resolve(null);
    }

    // @ts-ignore
    const cred = new window.PasswordCredential({
      id: body.email,
      password: body.password,
      name: body.email
    });
    return navigator.credentials.store(cred);
  }
}
