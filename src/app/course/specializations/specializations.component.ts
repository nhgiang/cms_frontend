import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SpecializationApiService } from '@shared/api/specialization.api.service';
import { DataTableContainer } from '@shared/class/data-table-container';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Observable } from 'rxjs';
import { Specialization } from 'types/models/course';
import { QueryResult } from 'types/typemodel';
import { SpecializationsCreateComponent } from './specializations-create/specializations-create.component';
import { SpecializationsEditComponent } from './specializations-edit/specializations-edit.component';

@Component({
  selector: 'app-specializations',
  templateUrl: './specializations.component.html',
  styleUrls: ['./specializations.component.scss']
})
export class SpecializationsComponent extends DataTableContainer<Specialization> implements OnInit {

  constructor(
    route: ActivatedRoute,
    router: Router,
    private specialiationApi: SpecializationApiService,
    private modalService: NzModalService,
    private notification: NzNotificationService,
  ) {
    super(route, router);
  }

  protected fetch(): Observable<QueryResult<Specialization>> {
    const params = {
      limit: this.quantity,
      page: this.page,
    };
    return this.specialiationApi.getAll(params);
  }

  deleteTeacher(id: string) {
    this.specialiationApi.delete(id).subscribe(() => {
      this.notification.success('Thành công', 'Xóa loại khóa học thành công!');
      this.refresh();
    });
  }

  addItem() {
    const modalRef = this.modalService.create({
      nzContent: SpecializationsCreateComponent,
      nzTitle: 'Thêm mới chuyên môn'
    });
    modalRef.componentInstance.created.subscribe(() => {
      this.refresh();
    });
  }

  editItem(id) {
    const modalRef = this.modalService.create({
      nzContent: SpecializationsEditComponent,
      nzTitle: 'Cập nhật chuyên môn',
      nzComponentParams: { id }
    });
    modalRef.componentInstance.edited.subscribe(() => {
      this.refresh();
    });
  }
}
