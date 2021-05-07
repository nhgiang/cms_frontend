import { FormGroup } from '@angular/forms';

export class InvalidFormError extends Error { }

export class Ultilities {

  static validateForm(form: FormGroup) {
    // tslint:disable-next-line: forin
    for (const key in form.controls) {
      form.controls[key].markAsDirty();
      form.controls[key].updateValueAndValidity();
    }
    if (form.invalid) {
      throw new InvalidFormError();
    }
  }

}
