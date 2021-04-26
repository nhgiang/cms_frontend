import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseTypesApiService } from '@shared/api/course-types.api.service';
import { DataTableContainer } from '@shared/class/data-table-container';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Observable } from 'rxjs';
import { CourseType, DataTableColumnMetaData, QueryResult } from 'types/typemodel';
import { CourseTypeCreateComponent } from './course-type-create/course-type-create.component';
import { CourseTypeEditComponent } from './course-type-edit/course-type-edit.component';

@Component({
  selector: 'app-course-type',
  templateUrl: './course-type.component.html',
  styleUrls: ['./course-type.component.scss']
})
export class CourseTypeComponent extends DataTableContainer<CourseType> {
  constructor(
    private courseTypesApi: CourseTypesApiService,
    private modalService: NzModalService,
    private notification: NzNotificationService,
    route: ActivatedRoute,
    router: Router
  ) {
    super(route, router);
  }

  protected fetch(): Observable<QueryResult<CourseType>> {
    const params = {
      limit: this.quantity,
      page: this.page,
    };
    return this.courseTypesApi.getList(params);
  }

  deleteTeacher(id: string) {
    this.courseTypesApi.delete(id).subscribe(() => {
      this.notification.success('Thành công', 'Xóa loại khóa học thành công!');
      this.refresh();
    });
  }

  addItem() {
    const modalRef = this.modalService.create({
      nzContent: CourseTypeCreateComponent,
      nzTitle: 'Thêm mới loại khóa học'
    });
    modalRef.componentInstance.created.subscribe(() => {
      this.refresh();
    });
  }

  editItem(id) {
    const modalRef = this.modalService.create({
      nzContent: CourseTypeEditComponent,
      nzTitle: 'Cập nhật loại khóa học',
      nzComponentParams: { id }
    });
    modalRef.componentInstance.edited.subscribe(() => {
      this.refresh();
    });
  }
}
