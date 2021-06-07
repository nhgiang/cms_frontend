import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Host, Input, OnInit, Optional, Output, ViewChild } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { TValidators } from '@shared/extentions/validators';
import { DestroyService } from '@shared/services/destroy.service';
import { cloneDeep, isEmpty } from 'lodash-es';
import { NzCollapseComponent, NzCollapsePanelComponent } from 'ng-zorro-antd/collapse';
import { collapseMotion } from 'ng-zorro-antd/core/animation';
import { NzConfigService } from 'ng-zorro-antd/core/config';
import { NzNoAnimationDirective } from 'ng-zorro-antd/core/no-animation';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
  providers: [
    DestroyService
  ],
  animations: [collapseMotion],
  // tslint:disable-next-line: no-host-metadata-property
  host: {
    '[class.ant-collapse-item-active]': 'nzActive',
    '[class.ant-collapse-item-disabled]': 'nzDisabled'
  }
})
export class QuestionComponent extends NzCollapsePanelComponent implements OnInit {

  @Input() questionType: 'Single' | 'Multiple' = 'Single';
  @Input() index: number;
  @Input() deletable: boolean;
  @Input() question: any;
  @Output() deleteQuestion = new EventEmitter();
  @ViewChild('question') questionEle: ElementRef<any>;
  answers = [{ answer: '', isCorrect: false }, { answer: '', isCorrect: false }];
  correctAnswer: number;
  form: FormGroup;

  constructor(
    public nzConfigService: NzConfigService,
    cdr: ChangeDetectorRef,
    @Host() nzCollapseComponent: NzCollapseComponent,
    elementRef: ElementRef,
    private fb: FormBuilder,
    @Optional() public noAnimation?: NzNoAnimationDirective,
  ) {
    super(nzConfigService, cdr, nzCollapseComponent, elementRef, noAnimation);
    this.buildForm();
  }

  get answerControlArray() {
    return this.form.get('answers') as FormArray;
  }

  ngOnInit(): void {
    if (isEmpty(this.question)) {
      this.answerControlArray.push(this.answersControl());
      this.answerControlArray.push(this.answersControl());
    } else {
      this.answers = this.question.answers;
      this.answers.forEach((_, i) => {
        this.answerControlArray.push(this.answersControl());
      });
      this.form.patchValue(this.question);
      this.question.answers?.map((answer, i) => {
        if (answer.isCorrect) {
          this.correctAnswer = i;
        }
      });
    }
  }

  buildForm(): void {
    this.form = this.fb.group({
      question: [null, TValidators.required],
      type: [this.questionType],
      answers: this.fb.array([], { validators: [TValidators.requiredAnswer, TValidators.duplicateAnswers] })
    });
  }

  change(value: any) {
    this.answerControlArray.controls.forEach((control, index) => {
      control.get('isCorrect').setValue(index === value);
    });
  }

  updateTypeQuestion(value: string) {
    if (value === 'Single') {
      this.answerControlArray.controls.forEach((control) => {
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

  addAnswer() {
    this.answers.push({ answer: '', isCorrect: false });
    this.answerControlArray.push(this.fb.group({
      answer: [null],
      isCorrect: [false]
    }));
  }

  removeAnswer() {
    this.answers = this.answers.slice(0, this.answers.length - 1);
    this.answerControlArray.removeAt(this.answers.length);
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

  submit() {
    if (this.form.invalid) { this.nzActive = true; }
    // tslint:disable-next-line: forin
    for (const key in this.form.controls) {
      this.form.controls[key].markAsDirty();
      this.form.controls[key].updateValueAndValidity();
    }
    return this.form.invalid ? this.questionEle.nativeElement.offsetTop : 0;
  }

  answersControl() {
    return this.fb.group({
      answer: [null],
      isCorrect: [false]
    });
  }
}
