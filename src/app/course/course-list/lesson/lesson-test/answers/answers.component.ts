import { Component, forwardRef, Input } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { AbstractControlDirective } from '@shared/controls/abstract-control.directive';

@Component({
  selector: 'app-answers',
  templateUrl: './answers.component.html',
  styleUrls: ['./answers.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AnswersComponent),
      multi: true
    }
  ]
})
export class AnswersComponent extends AbstractControlDirective {

  @Input() items = [1, 2, 3, 4];
  @Input() answerType: 'Single' | 'Multiple' = 'Single';
  form: FormGroup;

  constructor(
    private fb: FormBuilder
  ) {
    super();
    this.form = this.fb.group({
      question: null,
      type: this.answerType,
      answers: this.fb.array(this.items.map(x => {
        return this.fb.group({
          answer: null,
        });
      }))
    });
  }

}
