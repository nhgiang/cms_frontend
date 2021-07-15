import {
  AbstractControl,
  FormArray,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { inRange } from 'lodash-es';
import * as moment from 'moment';
import { toFixed } from 'utils/common';
export class TValidators extends Validators {
  static confirmPasswordValidator(group: FormGroup): ValidationErrors {
    const password =
      group.controls.password.value && group.controls.password.value.trim();
    const confirmPassword =
      group.controls.confirmPassword.value &&
      group.controls.confirmPassword.value.trim();
    if (!password || !confirmPassword) {
      return null;
    } else if (password !== confirmPassword) {
      group.controls.confirmPassword.setErrors({ confirm: true });
      return;
    }
  }

  static passwordRules(control: AbstractControl): ValidationErrors {
    if (!control.value) {
      return null;
    }
    const value = control.value && control.value.trim();
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/g;
    return regex.test(value)
      ? null
      : {
          passwordRules: true,
        };
  }

  static onlyNumber(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors => {
      if (!control.value) {
        return null;
      }
      const value = control.value && control.value.toString().trim();
      const regex = /^[0-9]*$/g;
      return regex.test(toFixed(value))
        ? null
        : {
            onlyNumber: true,
          };
    };
  }

  static link(control: AbstractControl): ValidationErrors {
    const regex =
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;
    return regex.test(control.value && control.value.trim())
      ? null
      : {
          link: true,
        };
  }

  static textRange =
    (min: number, max: number) => (control: AbstractControl) => {
      const value = control.value && control.value.toString().trim();
      if (value && value.length >= min && value.length <= max) {
        return null;
      }
      return {
        textRange: true,
      };
    };

  static numberRange =
    (
      min: number,
      max: number //inclusive
    ) =>
    (control: AbstractControl): ValidationErrors => {
      if (control.value) {
        const value = Number(control.value.toString().trim());
        if (inRange(value, min, max + 0.001)) return null;
        return {
          numberRange: {
            min: min,
            max: max,
          },
        };
      }
    };

  static emailRules(control: AbstractControl): ValidationErrors {
    const value = control.value && control.value.trim();
    if (!value) {
      return null;
    }
    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return regex.test(value)
      ? null
      : {
          emailRules: true,
        };
  }

  static phoneNumber(control: AbstractControl): ValidationErrors {
    const value = control.value && control.value.trim();
    if (!value) {
      return null;
    }
    const regex = /^(0[3|5|7|8|9])+([0-9]{8})$/;
    return regex.test(value)
      ? null
      : {
          phoneNumber: true,
        };
  }

  static required(control: AbstractControl): ValidationErrors {
    if (!control.value || !TValidators.trimData(control.value)) {
      return {
        required: true,
      };
    }
    return null;
  }

  static maxLength(length: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors => {
      if (!control.value) {
        return null;
      }
      return this.trimData(control.value.toString())?.length > length
        ? { maxLength: true, info: length }
        : null;
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
    if (
      answers.filter((t) => t.answer).length < 2 ||
      answers.filter((t) => t.isCorrect) < 1
    ) {
      return { requiredAnswer: true };
    }
    return null;
  };

  static timeValidator =
    (startField: string, endField: string) => (formGroup: AbstractControl) => {
      let startDate = formGroup.value[startField];
      let endDate = formGroup.value[endField];
      if (!startDate || !endDate) {
        return;
      }
      startDate = moment(startDate);
      endDate = moment(endDate);
      return endDate < startDate
        ? {
            endBeforeStart: true,
          }
        : null;
    };

  static duplicateAnswers = (form: FormArray) => {
    const answers = form.value.map((x) => x.answer);
    return TValidators.checkIfDuplicateExists(answers)
      ? { duplicate: true }
      : null;
  };

  static checkIfDuplicateExists(w) {
    return new Set(w).size !== w.length;
  }
}
