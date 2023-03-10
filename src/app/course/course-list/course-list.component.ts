import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseTypesApiService } from '@shared/api/course-types.api.service';
import { CourseApiService } from '@shared/api/course.api.service';
import { TeacherApiService } from '@shared/api/teacher.api.service';
import { DataTableContainer } from '@shared/class/data-table-container';
import { Option } from '@shared/interfaces/option.type';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Observable } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
import { Course } from 'types/models/course';
import { DataTableColumnMetaData, QueryResult } from 'types/typemodel';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss'],
})
export class CourseListComponent
  extends DataTableContainer<Course>
  implements OnInit
{
  search: FormGroup;
  metaData: DataTableColumnMetaData[] = [
    {
      key: 'name',
      name: 'Khóa học',
      sortable: false,
    },
    {
      key: 'teacher',
      name: 'Giảng viên',
      sortable: false,
      width: '200px',
    },
    {
      key: 'courseType',
      name: 'Loại khóa học',
      sortable: false,
    },
    {
      key: 'studentPrice',
      name: 'Giá học viên',
      sortable: true,
      class: 'text-right',
    },
    {
      key: 'partnerPrice',
      name: 'Giá đối tác',
      sortable: true,
      class: 'text-right',
    },
    {
      key: 'totalStudent',
      name: 'Tổng học viên',
      sortable: true,
      class: 'text-center',
    },
    {
      key: 'created',
      name: 'Ngày tạo',
      sortable: true,
    },
  ];

  constructor(
    route: ActivatedRoute,
    router: Router,
    private fb: FormBuilder,
    private teacherApi: TeacherApiService,
    private courseTypeApi: CourseTypesApiService,
    private courseApi: CourseApiService,
    private noti: NzNotificationService
  ) {
    super(route, router);
  }

  ngOnInit() {
    this.buildForm();
    super.ngOnInit();
    this.search.patchValue(this.params);
    this.search.valueChanges.pipe(debounceTime(500)).subscribe((value) => {
      this.onSearchParamsChanged(value);
    });
  }

  protected fetch(): Observable<QueryResult<Course>> {
    const params = {
      limit: this.quantity,
      page: this.page,
      order: this.order,
      sort: this.sort,
    };
    const { q, userId, typeId } = this.params;
    return this.courseApi.getList({ ...params, userId, q, typeId });
  }

  teacher$ = (params): Observable<Option[]> => {
    return this.teacherApi.getListSearch(params).pipe(
      map((res) =>
        res.items.map((x) => {
          return { value: x.id, label: x.fullName };
        })
      )
    );
  };

  type$ = (params): Observable<Option[]> => {
    return this.courseTypeApi.getListSearch(params).pipe(
      map((res) =>
        res.items.map((x) => {
          return { value: x.id, label: x.name };
        })
      )
    );
  };

  buildForm() {
    this.search = this.fb.group({
      q: [null],
      typeId: [null],
      userId: [null],
    });
  }

  deleteCourse(id) {
    this.courseApi.delete(id).subscribe(() => {
      this.noti.success('Thành công', 'Xóa khóa học thành công!');
      this.subscribe();
    });
  }
}
