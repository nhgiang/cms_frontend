import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { LessonApiService } from '@shared/api/lesson.api.service';
import { UnitsApiService } from '@shared/api/units.api.service';
import { TValidators } from '@shared/extentions/validators';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { switchMap } from 'rxjs/operators';
import { Lesson } from 'types/models/course';

@Component({
  selector: 'app-learning-path',
  templateUrl: './learning-path.component.html',
  styleUrls: ['./learning-path.component.scss']
})
export class LearningPathComponent implements OnInit, OnChanges {
  @Input() courseId: string;
  @Input() isDisable: boolean;
  isAddStep: boolean;
  lessonTitle: FormControl;
  lessons: Lesson[] = [];
  constructor(
    private lessonApi: LessonApiService,
    private notification: NzNotificationService,
    private unitApi: UnitsApiService
  ) { }


  ngOnInit(): void {
    this.lessonTitle = new FormControl(null, [TValidators.required]);

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.courseId.currentValue) {
      this.lessonApi.getLessonByCourse(this.courseId).subscribe(lessons => {
        this.lessons = lessons.map((lesson, i) => {
          return {
            ...lesson,
            order: i + 1
          };
        });
      });
    }
  }

  addLesson() {
    this.lessonTitle.markAsDirty();
    this.lessonTitle.updateValueAndValidity();

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
      this.lessons = lessons.map((lesson, i) => {
        return {
          ...lesson,
          order: i + 1
        };
      });
      this.isAddStep = false;
      this.lessonTitle.setValue(null);
    }, err => {
      this.notification.error('Thất bại', 'Tên chương bị trùng trong hệ thống khoá học!');
    });
  }

  refresh() {
    this.lessonApi.getLessonByCourse(this.courseId).subscribe(lessons => {
      this.lessons = lessons.map((lesson, i) => {
        return {
          ...lesson,
          order: i + 1
        };
      });
    });
  }

  toggleTrailer(lesson) {
    this.lessonApi.editLesson(lesson.id, {...lesson, enableTrailer: !lesson?.enableTrailer}).subscribe(() => {
      this.notification.success('Thành công', 'Cập nhật thông tin chương học thành công');
    });
  }
}
