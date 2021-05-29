import { Component, OnInit } from '@angular/core';
import { CommentApiService } from '@shared/api/comment.api.service';
import { LessonApiService } from '@shared/api/lesson.api.service';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, switchMap, tap } from 'rxjs/operators';
import { Option } from '@shared/interfaces/option.type';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CourseApiService } from '@shared/api/course.api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail-course-comment',
  templateUrl: './detail-course-comment.component.html',
  styleUrls: ['./detail-course-comment.component.scss']
})
export class DetailCourseCommentComponent implements OnInit {

  courseId: string;
  form: FormGroup;
  data: any;
  isSearch: boolean;
  pagination = { page: 1, limit: 10 };
  totalPage: number;
  firstValue: any;
  courseName: string;
  commentId: string[] = [];
  meta: any;
  constructor(
    private commentApiService: CommentApiService,
    private lessonApiService: LessonApiService,
    private courseApiService: CourseApiService,
    private route: ActivatedRoute,
    fb: FormBuilder
  ) {
    this.form = fb.group({
      lessonId: [null],
      q: [null]
    });
  }


  ngOnInit() {
    this.courseId = this.route.snapshot.paramMap.get('id');
    this.courseApiService.getById(this.courseId).subscribe(res => {
      this.courseName = res.name;
    });
    this.form.get('q').valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      tap((x) => {
        this.pagination.page = 1;
      }),
      // tslint:disable-next-line: max-line-length
      switchMap(() => this.commentApiService.findByLesson({ ...this.form.value, ...this.pagination }))
    ).subscribe(data => {
      this.isSearch = !!this.form.get('q').value;
      this.meta = data.meta;
      this.data = data.items;
    });
  }

  lesson$ = (): Observable<Option[]> => {
    return this.lessonApiService.getLessonByCourse(this.courseId).pipe(
      map(res => {
        return res.map(x => {
          return { value: x.id, label: x.title };
        });
      }),
      tap(x => {
        if (!this.firstValue) {
          this.firstValue = x[0].value;
          this.form.get('lessonId').setValue(this.firstValue);
        }
      })
    );
  }

  changeLesson(value: any) {
    this.getComment({ lessonId: value, ...this.pagination }).subscribe(res => {
      this.commentId = res.items.map(x => x.id);
      this.data = res.items;
      this.meta = res.meta;
    });
  }

  getComment(params?: any): Observable<any> {
    // tslint:disable-next-line: max-line-length
    return this.commentApiService.findByLesson({ ...this.form.value, ...params, ...this.pagination }).pipe(
      tap(res => {
        this.isSearch = false;
      }),
      map(res => {
        res.items.forEach(x => {
          x.fullName = (x.role === 'Teacher') ? 'Giảng viên ' + x.fullName : x.fullName;
          return x;
        });
        return res;
      }),
    );
  }

  getList() {
    this.getComment().pipe(tap(() => this.pagination.page = 1)).subscribe(res => {
      this.data = res.items;
    });
  }

  changePage(page: number) {
    this.pagination.page = page;
    this.getComment({ ...this.form.value, ...this.pagination }).subscribe(res => {
      this.data = res.items;
      this.meta = res.meta;
    });
  }
}
