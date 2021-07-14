import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Ultilities } from '@shared/extentions/ultilities';
import { TValidators } from '@shared/extentions/validators';

@Component({
  selector: 'app-step-1',
  templateUrl: './step-1.component.html',
})
export class Step1Component implements OnInit {
  @Input() form: FormGroup;
  @Input() data: any;
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
      size: [null, [TValidators.required, TValidators.maxLength(6), TValidators.onlyNumber()]],
      email: [null, [TValidators.required, TValidators.emailRules]],
    });
  }

  ngOnInit(): void {
    this.myForm.patchValue(this.form.value);
  }

  submit() {
    Ultilities.validateForm(this.myForm);
    this.form.patchValue(this.myForm.value);
    this.currentStepChange.emit(1 + this.currentStep);
  }

}
