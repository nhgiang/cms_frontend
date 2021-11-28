import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataTableContainer } from '@shared/class/data-table-container';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Observable, of } from 'rxjs';
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
    private modalService: NzModalService
  ) {
    super(route, router);
  }

  protected fetch(): Observable<QueryResult<any>> {
    return of(null);
  }

  addItem() {
    this.modalService.create({
      nzContent: ComboFormComponent,
      nzTitle: 'Tạo mới combo khóa học',
    });
  }

  deleteTeacher(id) {

  }

  editItem(id) {
    this.modalService.create({
      nzContent: ComboFormComponent,
      nzTitle: 'Cập nhật combo khóa học',
    });
  }
}
