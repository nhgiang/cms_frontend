import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UnitTestApiService } from '@shared/api/unit-test.api.service';
import { TValidators } from '@shared/extentions/validators';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { finalize } from 'rxjs/operators';
import { AnswersComponent } from './answers/answers.component';
import { cloneDeep } from 'lodash-es';

@Component({
  selector: 'app-lesson-test',
  templateUrl: './lesson-test.component.html',
  styleUrls: ['./lesson-test.component.scss']
})
export class LessonTestComponent implements OnInit {
  @ViewChildren(AnswersComponent) questions: QueryList<AnswersComponent>;
  questionType: 'Single' | 'Multiple';
  correctAnswer: string[];
  form: FormGroup;
  lessonTestId: string;
  loading: boolean;
  listQuestions: any[] = [{}];

  constructor(
    private fb: FormBuilder,
    private unitTestApi: UnitTestApiService,
    private notification: NzNotificationService,
    private activatedRoute: ActivatedRoute,
    private route: ActivatedRoute
  ) {
    this.buildForm();
    this.lessonTestId = this.route.snapshot.paramMap.get('unitId');
  }

  ngOnInit() {
    if (this.lessonTestId) { this.getUnitTest(); }
  }

  getUnitTest() {
    this.loading = true;
    this.unitTestApi.getById(this.lessonTestId).pipe(finalize(() => this.loading = false)).subscribe(res => {
      this.form.patchValue({
        title: res.title,
        point: res.point
      });
      this.listQuestions = res.questions;
    });
  }

  buildForm() {
    this.form = this.fb.group({
      lessionId: [this.activatedRoute.snapshot.params.lessonId],
      title: [null, TValidators.required],
      point: [null, TValidators.required],
      questions: []
    });
  }

  submit() {
    let invalid = false;
    const questions = [];
    this.questions.map(x => {
      if (!x.validate()) {
        invalid = true;
      }

      questions.push(x.getData());
    });
    if (invalid) {
      return;
    }
    this.form.controls.questions.setValue(questions);
    this.loading = true;
    if (this.lessonTestId) {
      this.unitTestApi.update(this.lessonTestId, this.form.value).pipe(finalize(() => this.loading = false)).subscribe(res => {
        this.notification.success('Thành Công', 'Cập nhật bài test thành công');
      });
    } else {
      this.unitTestApi.create(this.form.value).pipe(finalize(() => this.loading = false)).subscribe(res => {
        this.notification.success('Thành Công', 'Tạo mới bài test thành công');
      });
    }
  }

  addQuestion() {
    this.listQuestions = [...this.listQuestions, {}];
  }

  removeQuestion(index: number) {
    const result = this.form.get('questions').value as any[];
    this.listQuestions = result.filter((_, i) => i !== index);
  }

}
