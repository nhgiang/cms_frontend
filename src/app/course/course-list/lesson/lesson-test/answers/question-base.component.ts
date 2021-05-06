import { Directive } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { cloneDeep } from 'lodash-es';

@Directive()
export abstract class QuestionBaseComponent {
  form: FormGroup;

  get answerControlArray() {
    return this.form.get('answers') as FormArray;
  }

  constructor(
    protected fb: FormBuilder
  ) { }


  getData() {
    const value = cloneDeep(this.form.value);
    value.answers = value.answers.filter(t => t.answer);
    return value;
  }

  validate() {
    Object.keys(this.answerControlArray.controls).forEach(field => {
      const control = this.answerControlArray.get(field);
      if (control instanceof AbstractControl) {
        control.markAsDirty();
        control.updateValueAndValidity();
      }
    });
    if (this.form.invalid) {
      return false;
    }
    return true;
  }

  protected abstract buildForm(): void;
}
