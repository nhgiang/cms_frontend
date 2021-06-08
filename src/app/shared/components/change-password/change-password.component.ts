import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TValidators } from '@shared/extentions/validators';
import { ThemeConstantService } from '@shared/services/theme-constant.service';
@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
})
export class ChangePasswordComponent implements OnInit {
  pwChangeForm: FormGroup;

  currentPwVisible = false;
  pwVisible = false;
  confirmPwVisible = false;
  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.pwChangeForm = this.fb.group(
      {
        currentPassword: [null, TValidators.required],
        password: [null, TValidators.required, TValidators.passwordRules],
        confirmPassword: [null, TValidators.required],
      },
      { validators: [TValidators.confirmPasswordValidator] }
    );
  }
}
