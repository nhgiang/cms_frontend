import { Component, Inject, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UnitTestApiService } from '@shared/api/unit-test.api.service';
import { TValidators } from '@shared/extentions/validators';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { finalize } from 'rxjs/operators';
import { trimData } from 'utils/common';
import { QuestionComponent } from './question/question.component';

@Component({
  selector: 'app-lesson-test',
  templateUrl: './lesson-test.component.html',
  styleUrls: ['./lesson-test.component.scss'],
  // providers: [
  //   { provide: Window, useValue: window }
  // ]
})
export class LessonTestComponent implements OnInit {
  @ViewChildren(QuestionComponent) questions: QueryList<QuestionComponent>;
  questionType: 'Single' | 'Multiple';
  correctAnswer: string[];
  form: FormGroup;
  lessonTestId: string;
  loading: boolean;
  courseId: string;
  window: Window;

  listQuestions: any[] = [{}];

  constructor(
    private fb: FormBuilder,
    private unitTestApi: UnitTestApiService,
    private notification: NzNotificationService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.buildForm();
    this.lessonTestId = this.route.snapshot.paramMap.get('unitId');
    this.courseId = this.route.snapshot.paramMap.get('courseId');
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
      lessionId: [this.route.snapshot.params.lessonId],
      title: [null, [TValidators.required]],
      point: [null, [TValidators.required, TValidators.min(1)]],
      questions: []
    });
  }

  submit() {
    let invalid = false;
    const questions = [];
    const invalidPosition = [];
    this.questions.map(x => {
      invalidPosition.push(x.submit());
      if (!x.validate()) {
        invalid = true;
      }

      questions.push(x.getData());
    });
    if (invalid) {
      this.window.scrollTo({ top: invalidPosition.find(x => x !== 0) });
      return;
    }
    this.form.controls.questions.setValue(questions);
    this.loading = true;
    if (this.lessonTestId) {
      this.unitTestApi.update(this.lessonTestId, trimData(this.form.value)).pipe(finalize(() => this.loading = false)).subscribe(res => {
        this.notification.success('Thành Công', 'Cập nhật bài test thành công');
        this.router.navigate(['/course-management/course/edit', this.courseId]);
      });
    } else {
      this.unitTestApi.create(trimData(this.form.value)).pipe(finalize(() => this.loading = false)).subscribe(res => {
        this.notification.success('Thành Công', 'Tạo mới bài test thành công');
        this.router.navigate(['/course-management/course/edit', this.courseId]);
      });
    }
  }

  addQuestion() {
    this.listQuestions = [...this.listQuestions, {}];
  }

  removeQuestion(index: number) {
    this.listQuestions = this.listQuestions?.filter((_, i) => i !== index);
  }

}
