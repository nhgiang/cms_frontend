import { Component } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
    templateUrl: './login.component.html'
})

export class LoginComponent {
    loginForm: FormGroup;

    submitForm(): void {

    }

    constructor(private fb: FormBuilder) {
        this.loginForm = this.fb.group({
            userName: [null, [Validators.required]],
            password: [null, [Validators.required]]
        });
    }
}
