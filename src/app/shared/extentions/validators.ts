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
    if (!control.value) {
      return null;
    }
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,16}$/g;
    return regex.test(control.value) ? null : {
      passwordRules: true
    };
  }

  static onlyNumber(control: AbstractControl): ValidationErrors {
    if (!control.value) {
      return null;
    }
    const regex = /^[0-9]*$/g;
    return regex.test(control.value) ? null : {
      onlyNumber: true
    };
  }

  static link(control: AbstractControl): ValidationErrors {
    const regex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g
    return regex.test(control.value) ? null : {
      link: true
    };
  }
}
