import { Component, OnInit } from '@angular/core';
import { CourseTypesApiService } from '@shared/api/course.api.service';
import { DataTableContainer } from '@shared/class/data-table-container';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Observable } from 'rxjs';
import { CourseType, QueryResult } from 'types/typemodel';
import { CourseTypeCreateComponent } from './course-type-create/course-type-create.component';

@Component({
  selector: 'app-course-type',
  templateUrl: './course-type.component.html',
  styleUrls: ['./course-type.component.scss']
})
export class CourseTypeComponent extends DataTableContainer<CourseType> {

  constructor(
    private courseTypesApi: CourseTypesApiService,
    private modalService: NzModalService
  ) {
    super();
  }

  protected fetch(): Observable<QueryResult<CourseType>> {
    const params = {
      limit: this.quantity,
      page: this.page,
    };
    return this.courseTypesApi.getList(params);
  }

  deleteTeacher(id: string) {

  }

  addItem() {
    this.modalService.create({
      nzContent: CourseTypeCreateComponent,
      nzTitle: 'Thêm mới loại khóa học',
    });
  }
}
