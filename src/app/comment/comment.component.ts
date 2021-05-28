import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseTypesApiService } from '@shared/api/course-types.api.service';
import { CourseApiService } from '@shared/api/course.api.service';
import { PostTypesApiService } from '@shared/api/post-types.api.service';
import { TeacherApiService } from '@shared/api/teacher.api.service';
import { DataTableContainer } from '@shared/class/data-table-container';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Observable } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
import { DataTableColumnMetaData, QueryResult } from 'types/typemodel';
import { Option } from '@shared/interfaces/option.type';
import { FormBuilder, FormGroup } from '@angular/forms';
import { pickBy } from 'lodash-es';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent extends DataTableContainer<any> {

  search: FormGroup;
  constructor(
    router: Router,
    route: ActivatedRoute,
    private modalService: NzModalService,
    private notification: NzNotificationService,
    private courseApiService: CourseApiService,
    private teacherApi: TeacherApiService,
    private courseTypeApi: CourseTypesApiService,
    private courseApi: CourseApiService,
    fb: FormBuilder
  ) {
    super(route, router);
    this.search = fb.group({
      q: '',
      typeId: '',
      userId: ''
    });
  }

  metaData: DataTableColumnMetaData[] = [
    {
      key: 'id',
      name: 'ID',
      sortable: false,
    },
    {
      key: 'course',
      name: 'Khóa học',
      sortable: false,
    },
    {
      key: 'teacher',
      name: 'Giảng viên',
      sortable: false,
    },
    {
      key: 'course_type',
      name: 'Loại khóa học',
      sortable: false,
    },
    {
      key: 'totalComment',
      name: 'Tổng số comment',
      sortable: true,
    },
  ];

  ngOnInit() {
    super.ngOnInit();
    this.search.valueChanges.pipe(debounceTime(500)).subscribe(value => {
      this.onSearchParamsChanged(value);
    });
  }

  protected fetch(): Observable<QueryResult<any>> {
    const params = {
      limit: this.quantity,
      page: this.page,
      order: this.order,
      sort: this.sort
    };
    const { q, userId, typeId } = this.params;
    return this.courseApiService.comment({ ...params, userId, q, typeId });
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

  readRouteParams(params: { [key: string]: any }) {
    super.readRouteParams(params);
    const a = pickBy(params, (value, key) => {
      const formSearch = Object.keys(this.search.value);
      if (formSearch.includes(key) && this.search.value[key] !== value) {
        return true;
      }
      return false;
    });
    Object.keys(a).forEach(field => {
      this.search.get(field).patchValue(a[field]);
    });
  }
}
