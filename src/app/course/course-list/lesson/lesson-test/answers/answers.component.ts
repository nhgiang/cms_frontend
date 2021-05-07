import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Host, Input, OnChanges, OnInit, Optional, Output, SimpleChanges } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { TValidators } from '@shared/extentions/validators';
import { DestroyService } from '@shared/services/destroy.service';
import { cloneDeep } from 'lodash-es';
import { NzCollapsePanelComponent, NzCollapseComponent } from 'ng-zorro-antd/collapse';
import { collapseMotion } from 'ng-zorro-antd/core/animation';
import { NzConfigService } from 'ng-zorro-antd/core/config';
import { NzNoAnimationDirective } from 'ng-zorro-antd/core/no-animation';

@Component({
  selector: 'app-answers',
  templateUrl: './answers.component.html',
  styleUrls: ['./answers.component.scss'],
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
export class AnswersComponent extends NzCollapsePanelComponent implements OnInit, OnChanges {

  @Input() items = [1, 2, 3, 4];
  @Input() questionType: 'Single' | 'Multiple' = 'Single';
  @Input() index: number;
  @Input() deleteAble: boolean;
  @Input() question: any;
  @Output() deleteQuestion = new EventEmitter();
  correctAnswer: number;
  form: FormGroup;

  constructor(
    public nzConfigService: NzConfigService,
    cdr: ChangeDetectorRef,
    @Host() nzCollapseComponent: NzCollapseComponent,
    elementRef: ElementRef,
    private fb: FormBuilder,
    private destroy: DestroyService,
    @Optional() public noAnimation?: NzNoAnimationDirective,
  ) {
    super(nzConfigService, cdr, nzCollapseComponent, elementRef, noAnimation);
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
