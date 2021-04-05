import { AbstractControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
export class TValidators extends Validators {
  static confirmPasswordValidator(control: AbstractControl): ValidationErrors {
    const group = control as FormGroup;
    if (!group.controls.password.value) {
      group.controls.password.setErrors({ required: true });
      return { require: true };
    } else if (group.controls.password.value !== group.controls.confirmPassword.value) {
      group.controls.confirmPassword.setErrors({ confirm: true });
      return { confirm: true };
    }
    group.controls.password.setErrors(null);
    group.controls.confirmPassword.setErrors(null);
    return null;
  }

  static passwordRules(control: AbstractControl): ValidationErrors {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,16}$/g;
    return regex.test(control.value) ? null : {
      passwordRules: true
    };
  }
}
