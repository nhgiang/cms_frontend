import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { TValidators } from '@shared/extentions/validators';
import { DestroyService } from '@shared/services/destroy.service';
import { cloneDeep } from 'lodash-es';

@Component({
  selector: 'app-answers',
  templateUrl: './answers.component.html',
  styleUrls: ['./answers.component.scss'],
  providers: [
    DestroyService
  ]
})
export class AnswersComponent implements OnInit, OnChanges {

  @Input() items = [1, 2, 3, 4];
  @Input() questionType: 'Single' | 'Multiple' = 'Single';
  @Input() index: number;
  @Input() deleteAble: boolean;
  @Input() question: any;
  @Output() deleteQuestion = new EventEmitter();
  correctAnswer: number;
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private destroy: DestroyService,
  ) {
    this.buildForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const question = changes.question?.currentValue;
    if (question) {
      this.form.patchValue(question);
      question.answers?.map((answer, i) => {
        if (answer.isCorrect) {
          this.correctAnswer = i;
        }
      })
    }
  }

  get answerControlArray() {
    return this.form.get('answers') as FormArray;
  }

  ngOnInit(): void {
    this.form.valueChanges.subscribe(console.log)
  }

  protected buildForm(): void {
    this.form = this.fb.group({
      question: [null, TValidators.required],
      type: [this.questionType],
      answers: this.fb.array(this.items.map(() => this.fb.group({
        answer: [null],
        isCorrect: [false]
      })), { validators: TValidators.requiredAnswer })
    });
  }

  change(value: any) {
    (this.form.get('answers') as FormArray).controls.forEach((control, index) => {
      control.get('isCorrect').setValue(index === value);
    });
  }

  updateTypeQuestion(value: string) {
    if (value === 'Single') {
      (this.form.get('answers') as FormArray).controls.forEach((control) => {
        control.get('isCorrect').setValue(false);
        this.correctAnswer = null;
      });
    }
  }

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
}
