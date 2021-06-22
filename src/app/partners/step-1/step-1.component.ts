import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Ultilities } from '@shared/extentions/Ultilities';
import { TValidators } from '@shared/extentions/validators';

@Component({
  selector: 'app-step-1',
  templateUrl: './step-1.component.html',
  styleUrls: ['./step-1.component.scss']
})
export class Step1Component {
  @Input() form: FormGroup;
  @Input() currentStep!: string;
  @Output() currentStepChange = new EventEmitter();
  myForm: FormGroup;

  constructor(
    private fb: FormBuilder
  ) {
    this.myForm = this.fb.group({
      name: [null, [TValidators.required]],
      representative: [null, [TValidators.required]],
      address: [null, [TValidators.required]],
      phoneNumber: [null, [TValidators.required, TValidators.phoneNumber]],
      size: [null, [TValidators.required, TValidators.maxLength(6)]],
      email: [null, [TValidators.required, TValidators.emailRules]],
    });
  }

  submit() {
    Ultilities.validateForm(this.myForm);
    this.form.patchValue(this.myForm.value);
    this.currentStepChange.emit(1 + this.currentStep);
  }

}
