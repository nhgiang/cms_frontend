import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import { CourseApiService } from '@shared/api/course.api.service';
import { SettingApiService } from '@shared/api/setting.api.service';
import { IPaginate } from '@shared/interfaces/paginate.type';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { map, tap } from 'rxjs/operators';
import { SettingKeyEndPoint } from 'types/enums';
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
    private settingApi: SettingApiService<{ courseId: string, quantitySold: number, view: number }[]>,
    private notification: NzNotificationService
  ) {
    this.settingApi.setEnpoint(SettingKeyEndPoint.HottestCourse);
  }

  ngOnInit(): void {
    this.form = this.fb.array(Array(10).fill(0).map(() => this.fb.group({
      courseId: [null],
      quantitySold: [null],
      view: [null]
    })));
    this.settingApi.get().subscribe(res => {
      const data = res.map(val => {
        return {
          courseId: val.courseId,
          quantitySold: val.quantitySold || 0,
          view: val.view || 0
        };
      });
      this.form.patchValue(data);
    });
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
    const body = this.form.value.map(val => {
      return {
        courseId: val?.courseId,
        quantitySold: +val?.quantitySold,
        view: +val?.view
      };
    });
    this.settingApi.post(body).subscribe(() => {
      this.notification.success('Thành công', 'Cập nhật thông tin khóa học hot nhất thành công!');
    });
  }
}
