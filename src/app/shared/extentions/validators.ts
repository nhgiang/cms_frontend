import { AbstractControl, FormArray, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
export class TValidators extends Validators {

  static confirmPasswordValidator(control: AbstractControl): ValidationErrors {
    const group = control as FormGroup;
    if (!group.controls.password.value) {
      group.controls.password.setErrors({ required: true });
      return { require: true };
    } else if (group.controls.password.value.trim() !== group.controls.confirmPassword.value.trim()) {
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
    const value = control.value && control.value.trim();
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/g;
    return regex.test(value) ? null : {
      passwordRules: true
    };
  }

  static onlyNumber(control: AbstractControl): ValidationErrors {
    if (!control.value) {
      return null;
    }
    const value = control.value && control.value.trim();
    const regex = /^[0-9]*$/g;
    return regex.test(value) ? null : {
      onlyNumber: true
    };
  }

  static link(control: AbstractControl): ValidationErrors {
    const regex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;
    return regex.test(control.value && control.value.trim()) ? null : {
      link: true
    };
  }

  static textRange = (min: number, max: number) => (control: AbstractControl) => {
    const value = control.value && control.value.trim();
    if (value && value.length >= min && value.length <= max) {
      return null;
    }
    return {
      textRange: true
    };
  }

  static emailRules(control: AbstractControl): ValidationErrors {
    if (!control.value) {
      return null;
    }
    const value = control.value && control.value.trim();
    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    return regex.test(value) ? null : {
      emailRules: true
    };
  }

  static phoneNumber(control: AbstractControl): ValidationErrors {
    if (!control.value) {
      return null;
    }
    const value = control.value && control.value.trim();
    const regex = /^(84|0[3|5|7|8|9])+([0-9]{8})$/;
    return regex.test(value) ? null : {
      phoneNumber: true
    };
  }

  static required(control: AbstractControl): ValidationErrors {
    if (!control.value || !TValidators.trimData(control.value)) {
      return {
        required: true
      };
    }
    return null;
  }

  static maxLength(length: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors => {
      if (!control.value) { return null; }
      return this.trimData(control.value)?.length > length ? { maxLength: true } : null;
    };
  }

  static trimData(data: any): any {
    if (data && typeof data === 'string') {
      return data.trim();
    }
    return data;
  }

  static requiredAnswer = (form: FormArray) => {
    const answers = form.value;
    if (answers.filter(t => t.answer).length < 2 || answers.filter(t => t.isCorrect) < 1) {
      return { requiredAnswer: true };
    }
    return null;
  }
}
