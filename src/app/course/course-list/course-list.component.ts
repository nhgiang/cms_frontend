import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TeacherApiService } from '@shared/api/teacher.api.service';
import { DataTableContainer } from '@shared/class/data-table-container';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Course } from 'types/models/course';
import { DataTableColumnMetaData, QueryResult } from 'types/typemodel';
import { Option } from '@shared/interfaces/option.type';
import { CourseTypesApiService } from '@shared/api/course-types.api.service';
import { CourseApiService } from '@shared/api/course.api.service';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent extends DataTableContainer<Course> implements OnInit {
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
    },
    {
      key: 'teacherPrice',
      name: 'Giá đối tác',
      sortable: true,
    },
    {
      key: 'numberOfLearner',
      name: 'Tổng học viên',
      sortable: true,
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
    private courseApi: CourseApiService
  ) {
    super(route, router);
  }

  ngOnInit() {
  }

  protected fetch(): Observable<QueryResult<Course>> {
    const params = {
      limit: this.quantity,
      page: this.page,
    };
    const { specializationId, q, status } = this.params;
    return this.courseApi.getList({ ...params, specializationId, q, status });
  }

  teacher$ = (params): Observable<Option[]> => {
    return this.teacherApi.getList(params).pipe(map(res => res.items.map(x => {
      return { value: x.id, label: x.fullName };
    })));
  }

  type$ = (params): Observable<Option[]> => {
    return this.courseTypeApi.getList(params).pipe(map(res => res.items.map(x => {
      return { value: x.id, label: x.name };
    })));
  }

  buildForm() {
    this.search = this.fb.group({
      courseName: [null],
      courseType: [null],
      teacher: [null],
    });
  }
}
