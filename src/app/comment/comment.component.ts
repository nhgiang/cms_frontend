import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseTypesApiService } from '@shared/api/course-types.api.service';
import { CourseApiService } from '@shared/api/course.api.service';
import { TeacherApiService } from '@shared/api/teacher.api.service';
import { DataTableContainer } from '@shared/class/data-table-container';
import { Observable } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
import { DataTableColumnMetaData, QueryResult } from 'types/typemodel';
import { Option } from '@shared/interfaces/option.type';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent extends DataTableContainer<any> implements OnInit {

  search: FormGroup;
  constructor(
    router: Router,
    route: ActivatedRoute,
    private courseApiService: CourseApiService,
    private teacherApi: TeacherApiService,
    private courseTypeApi: CourseTypesApiService,
    fb: FormBuilder
  ) {
    super(route, router);
    this.search = fb.group({
      q: [null],
      typeId: [null],
      userId: [null],
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
    this.search.patchValue(this.params);
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

  teacher$ = (params: any): Observable<Option[]> => {
    return this.teacherApi.getList(params).pipe(map(res => res.items.map(x => {
      return { value: x.id, label: x.fullName };
    })));
  }

  type$ = (params: any): Observable<Option[]> => {
    return this.courseTypeApi.getList(params).pipe(map(res => res.items.map(x => {
      return { value: x.id, label: x.name };
    })));
  }

}
