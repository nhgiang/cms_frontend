import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Ultilities } from '@shared/extentions/Ultilities';
import { TValidators } from '@shared/extentions/validators';

@Component({
  selector: 'app-step-3',
  templateUrl: './step-3.component.html',
  styleUrls: ['./step-3.component.scss']
})
export class Step3Component implements OnInit {

  isConfirmPasswordVisible = false;
  isPasswordVisible = false;
  @Input() form: FormGroup;
  @Input() currentStep: number;
  @Output() currentStepChange = new EventEmitter();
  @Output() submitForm = new EventEmitter();
  myForm: FormGroup;

  constructor(
    private fb: FormBuilder
  ) {
    this.myForm = this.fb.group({
      email: [null, [TValidators.required, TValidators.emailRules]],
      password: [null, [TValidators.required, TValidators.passwordRules]],
      confirmPassword: [null, [TValidators.required, TValidators.passwordRules]]
    }, { validator: TValidators.confirmPasswordValidator });
  }

  ngOnInit(): void {
    this.myForm.patchValue(this.form.value.admin);
    this.myForm.get('confirmPassword').setValue(this.form.value.admin.password);
  }

  preStep() {
    this.currentStepChange.emit(this.currentStep - 1);
  }

  submit() {
    Ultilities.validateForm(this.myForm);
    this.form.get('admin').patchValue(this.myForm.value);
    this.submitForm.emit(true);
  }
}
