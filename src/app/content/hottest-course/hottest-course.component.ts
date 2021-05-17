import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import { CourseApiService } from '@shared/api/course.api.service';
import { SettingApiService } from '@shared/api/setting.api.service';
import { IPaginate } from '@shared/interfaces/paginate.type';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { map, tap } from 'rxjs/operators';
import { Course } from 'types/models/course';

@Component({
  selector: 'app-hottest-course',
  templateUrl: './hottest-course.component.html',
  styleUrls: ['./hottest-course.component.scss']
})
export class HottestCourseComponent implements OnInit {
  form: FormArray;
  objKey: { [key: string]: Course } = {};
  optionsDisabled: any[];
  constructor(
    private courseApi: CourseApiService,
    private fb: FormBuilder,
    private settingApi: SettingApiService,
    private notification: NzNotificationService
  ) { }

  ngOnInit(): void {
    this.form = this.fb.array(Array(10).fill(0).map(() => this.fb.group({
      courseId: [null]
    })));
    this.settingApi.hottestCoruse.get().subscribe(res => this.form.patchValue(res));
    this.form.valueChanges.subscribe(value => {
      this.optionsDisabled = value.map(t => {
        return {
          id: t.courseId
        };
      });
    });
  }

  courses$ = (params: IPaginate) => {
    return this.courseApi.getList(params).pipe(
      tap(res => res.items.forEach(course => this.objKey[course.id] = course)),
      // tslint:disable-next-line: max-line-length
      map(res => res.items.map(x => ({ value: x.id, label: x.name })))
    );
  }

  submit() {
    this.settingApi.hottestCoruse.post(this.form.value).subscribe(() => {
      this.notification.success('Thành công', 'Cập nhật thông tin khóa học hot nhất thành công!');
    });
  }
}
