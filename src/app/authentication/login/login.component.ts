import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Ultilities } from '@shared/extentions/Ultilities';
import { TValidators } from '@shared/extentions/validators';
import { AuthenticationService } from '@shared/services/authentication.service';
import { finalize } from 'rxjs/operators';
@Component({
    templateUrl: './login.component.html'
})
export class LoginComponent {
    myForm: FormGroup;
    loading = false;

    constructor(
        private fb: FormBuilder,
        private authService: AuthenticationService,
        private router: Router,
    ) {
        this.myForm = this.fb.group({
            email: [null, [TValidators.required, TValidators.email]],
            password: [null, [TValidators.required]]
        });
    }

    submitForm(): void {
        Ultilities.validateForm(this.myForm);
        this.loading = true;
        this.authService.login(this.myForm.value)
            .pipe(finalize(() => this.loading = false))
            .subscribe(() => this.router.navigate(['/']));
    }
}
