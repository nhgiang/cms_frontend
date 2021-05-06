import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import { CourseApiService } from '@shared/api/course.api.service';
import { SettingApiService } from '@shared/api/setting.api.service';
import { IPaginate } from '@shared/interfaces/paginate.type';
import { omitBy } from 'lodash';
import { isNil } from 'ng-zorro-antd/core/util';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { merge } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Course } from 'types/models/course';

@Component({
  selector: 'app-hottest-course',
  templateUrl: './hottest-course.component.html',
  styleUrls: ['./hottest-course.component.scss']
})
export class HottestCourseComponent implements OnInit {
  dummy: number[];
  form: FormArray;
  courses: Course[];
  constructor(
    private courseApi: CourseApiService,
    private fb: FormBuilder,
    private settingApi: SettingApiService,
    private notification: NzNotificationService
  ) { }

  ngOnInit(): void {
    this.dummy = Array(10).fill(0);
    this.form = this.fb.array(this.dummy.map(() => this.fb.group({
      courseId: [null]
    })));
    // this.form.valueChanges.pipe(switchMap(res => {
    //   const ids = res.filter(x => x.courseId).map(({ courseId }) => {
    //     return courseId;
    //   });
    //   return this.courseApi.getInfoOfCourseHottest({ ids });
    // })).subscribe(res => {
    // });
    // this.courses = res.items;
    // merge(this.form.valueChanges,  )
    // this.settingApi.hottestCoruse.get().pipe(
    //   switchMap(res => {
    //     const ids = res.filter(x => x.courseId).map(({ courseId }) => {
    //       return courseId;
    //     });
    //     return this.courseApi.getInfoOfCourseHottest({ ids: ids });
    //   }),
    //   map(res => { return res.items; }))
    //   .subscribe(res => {
    //     this.courses = res;
    //     this.form.patchValue(res.map(course => {
    //       return { courseId: course.id };
    //     }));
    //     console.log(this.form.value);
    //   });
  }

  courses$ = (params: IPaginate) => {
    return this.courseApi.getList(params).pipe(map(res => res.items.map(x => {
      return { value: x.id, label: x.name };
    })));
  }

  submit() {
    // console.log(this.form.value)
    const data = this.form.value.map(x => {
      const obj = omitBy(x, isNil);
      return { courseId: obj };
    }).filter(x => Object.keys(x).length > 0);
    this.settingApi.hottestCoruse.post(data).subscribe(() => {
      this.notification.success('Thành công', '');
    });
  }
}
