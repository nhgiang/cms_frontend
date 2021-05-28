import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommentApiService } from '@shared/api/comment.api.service';
import { LessonApiService } from '@shared/api/lesson.api.service';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, switchMap, take, tap } from 'rxjs/operators';
import { Option } from '@shared/interfaces/option.type';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CourseApiService } from '@shared/api/course.api.service';

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
  pagination = { page: 1, limit: 100 };
  totalPage: number;
  firstValue: any;
  courseName: string;
  commentId: string[] = [];
  constructor(
    private commentApiService: CommentApiService,
    private route: ActivatedRoute,
    private lessionApiService: LessonApiService,
    private courseApiService: CourseApiService,
    fb: FormBuilder
  ) {
    this.form = fb.group({
      ids: [null],
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
      switchMap((x) => this.commentApiService.get({ q: x, ids: [...JSON.parse(this.form.get('ids').value)].concat(!x ? [] : this.commentId), ...this.pagination }))
    ).subscribe(data => {
      this.isSearch = !!this.form.get('q').value;
      this.totalPage = data.meta.totalPages;
      this.data = data.items;
    });
  }

  lession$ = (): Observable<Option[]> => {
    return this.lessionApiService.getLessonByCourse(this.courseId).pipe(
      map(res => {
        return res.map(x => {
          return { value: JSON.stringify(x.unitsAndTests.map(y => y.id)), label: x.title };
        });
      }),
      tap(x => {
        if (!this.firstValue) {
          this.firstValue = x[0].value;
          this.form.get('ids').setValue(this.firstValue);
        }
      })
    );
  }

  changeLession(value) {
    this.getComment({ ids: JSON.parse(value), ...this.pagination }).subscribe(res => {
      this.commentId = res.items.map(x => x.id);
      this.data = res.items;
    });
  }

  getComment(params?: any): Observable<any> {
    // tslint:disable-next-line: max-line-length
    return this.commentApiService.get({ q: this.form.get('q').value, ids: JSON.parse(this.form.get('ids').value), ...params, ...this.pagination }).pipe(
      tap(res => {
        this.isSearch = false;
        this.totalPage = res.meta.totalPages;
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

  increasePage() {
    this.pagination.page++;
    this.getComment({ q: this.form.get('q').value, ids: JSON.parse(this.form.get('ids').value), ...this.pagination }).subscribe(res => {
      this.data = this.data.concat(res.items);
    });
  }
}
