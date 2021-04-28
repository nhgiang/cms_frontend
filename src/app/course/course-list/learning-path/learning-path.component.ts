import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { LessonApiService } from '@shared/api/lesson.api.service';
import { TValidators } from '@shared/extentions/validators';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { switchMap } from 'rxjs/operators';
import { Lesson } from 'types/models/course';

@Component({
  selector: 'app-learning-path',
  templateUrl: './learning-path.component.html',
  styleUrls: ['./learning-path.component.scss']
})
export class LearningPathComponent implements OnInit {
  @Input() courseId = 'c2841ab5-0ed9-4598-bcbb-8bdff3f05bce';
  isAddStep: boolean;
  lessonTitle: FormControl;
  lessons: Lesson[] = [];
  constructor(
    private lessonApi: LessonApiService,
    private notification: NzNotificationService
  ) { }

  ngOnInit(): void {
    this.lessonTitle = new FormControl(null, [TValidators.required]);
    this.lessonApi.getLessonByCourse(this.courseId).subscribe(lessons => {
      this.lessons = lessons;
    });
  }

  addLesson() {
    console.log(this.lessonTitle)
    if (this.lessonTitle.invalid) {
      return;
    }
    const body = {
      courseId: this.courseId,
      title: this.lessonTitle.value,
    };
    this.lessonApi.createLesson(body).pipe(switchMap(() => {
      return this.lessonApi.getLessonByCourse(this.courseId);
    })).subscribe(lessons => {
      this.notification.success('Thành công', 'Thêm mới chương học thành công!');
      this.lessons = lessons;
      this.isAddStep = false;
    });
  }

  refresh() {
    this.lessonApi.getLessonByCourse(this.courseId).subscribe(lessons => {
      this.lessons = lessons;
    });
  }
}
