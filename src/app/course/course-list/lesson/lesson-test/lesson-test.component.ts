import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UnitTestApiService } from '@shared/api/unit-test.api.service';
import { TValidators } from '@shared/extentions/validators';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { finalize } from 'rxjs/operators';
import { trimData } from 'utils/common';
import { AnswersComponent } from './answers/answers.component';

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
  courseId: string;

  listQuestions: any[] = [{}];

  constructor(
    private fb: FormBuilder,
    private unitTestApi: UnitTestApiService,
    private notification: NzNotificationService,
    private activatedRoute: ActivatedRoute,
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
      x.submit();
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
