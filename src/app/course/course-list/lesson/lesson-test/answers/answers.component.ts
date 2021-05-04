import { ChangeDetectorRef, Component, forwardRef, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { AbstractControlDirective } from '@shared/controls/abstract-control.directive';
import { TValidators } from '@shared/extentions/validators';
import { DestroyService } from '@shared/services/destroy.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-answers',
  templateUrl: './answers.component.html',
  styleUrls: ['./answers.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AnswersComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: AnswersComponent,
      multi: true
    },
    DestroyService
  ]
})
export class AnswersComponent extends AbstractControlDirective implements OnInit {

  @Input() items = [1, 2, 3, 4];
  @Input() answerType: 'Single' | 'Multiple' = 'Single';
  form: FormGroup;
  corectAnswer = 0;

  constructor(
    private fb: FormBuilder,
    private destroy: DestroyService,
    private cdr: ChangeDetectorRef
  ) {
    super();
    this.form = this.fb.group({
      question: null,
      type: this.answerType,
      answers: this.fb.array(this.items.map(() => this.fb.group({
        answer: [null, TValidators.required],
        isCorrect: [false, Validators.required]
      })))
    });
  }

  ngOnInit(): void {
    this.form.valueChanges.pipe(takeUntil(this.destroy)).subscribe(data => {
      this.onChangeFn(data);
    });
  }

  change(value: any) {
    (this.form.get('answers') as FormArray).controls.forEach((control, index) => {
      control.get('isCorrect').setValue(index === value);
    });
  }

  validate() { }
}
