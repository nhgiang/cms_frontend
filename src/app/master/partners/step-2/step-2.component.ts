import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors } from '@angular/forms';
import { PartnersApiService } from '@shared/api/partners.api.service';
import { Ultilities } from '@shared/extentions/Ultilities';
import { TValidators } from '@shared/extentions/validators';
import { Observable, timer } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-step-2',
  templateUrl: './step-2.component.html',
  styleUrls: ['./step-2.component.scss']
})
export class Step2Component implements OnInit {

  @Input() form: FormGroup;
  @Input() currentStep: number;
  @Output() currentStepChange = new EventEmitter();
  myForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private partnersApiService: PartnersApiService
  ) {
    this.myForm = this.fb.group({
      domain: [null, [TValidators.required, TValidators.maxLength(10)], this.validateDomain.bind(this)],
      maxCourses: [null, [TValidators.required, TValidators.maxLength(3), TValidators.min(1), TValidators.onlyNumber()]],
    });
  }

  ngOnInit(): void {
    this.myForm.patchValue(this.form.value);
    this.myForm.get('maxCourses').setValue(this.form.value.settings?.maxCourses);
  }

  validateDomain(control: AbstractControl): Observable<ValidationErrors | null> {
    return timer(300).pipe(
      switchMap(() => {
        return this.partnersApiService.validateDomain(control.value).pipe(
          map(res => {
            return res ? { exits: true } : null;
          })
        );
      })
    );
  }

  preStep() {
    this.currentStepChange.emit(this.currentStep - 1);
  }

  submit() {
    Ultilities.validateForm(this.myForm);
    this.form.patchValue(this.myForm.value);
    this.form.get('settings').patchValue(this.myForm.value);
    this.currentStepChange.emit(1 + this.currentStep);
  }
}