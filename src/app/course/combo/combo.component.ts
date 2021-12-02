import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ComboApiService } from '@shared/api/combo.api.service';
import { DataTableContainer } from '@shared/class/data-table-container';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { Observable, of } from 'rxjs';
import { filter, take } from 'rxjs/operators';
import { QueryResult } from 'types/typemodel';
import { ComboFormComponent } from './combo-form/combo-form.component';

@Component({
  selector: 'app-combo',
  templateUrl: './combo.component.html',
  styleUrls: ['./combo.component.scss']
})
export class ComboComponent extends DataTableContainer<any> implements OnInit {

  constructor(
    route: ActivatedRoute,
    router: Router,
    private modalService: NzModalService,
    private comboService: ComboApiService
  ) {
    super(route, router);
  }

  protected fetch(): Observable<QueryResult<any>> {
    const params = {
      limit: this.quantity,
      page: this.page
    };
    return this.comboService.getList(params);
  }

  addItem() {
    const modalRef = this.modalService.create({
      nzContent: ComboFormComponent,
      nzTitle: 'Tạo mới combo khóa học',
      nzFooter: null
    });
    modalRef.afterClose.pipe(take(1), filter(t => t)).subscribe(() => this.refresh());
  }

  deleteTeacher(id) {
    this.comboService.deleteCombo(id).subscribe(() => {
      this.refresh();
    })
  }

  editItem(id) {
    let modalRef: NzModalRef;
    this.comboService.getDetail(id).subscribe((detail) => {
      modalRef = this.modalService.create({
        nzContent: ComboFormComponent,
        nzTitle: 'Cập nhật combo khóa học',
        nzFooter: null,
        nzComponentParams: {
          data: detail
        }
      });
    });
    modalRef.afterClose.pipe(take(1), filter(t => t)).subscribe(() => this.refresh());
  }
}
