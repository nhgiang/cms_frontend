import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataTableContainer } from '@shared/class/data-table-container';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Observable, of } from 'rxjs';
import { QueryResult } from 'types/typemodel';
import { VoucherFormComponent } from './voucher-form/voucher-form.component';

@Component({
  selector: 'app-voucher',
  templateUrl: './voucher.component.html',
  styleUrls: ['./voucher.component.scss']
})
export class VoucherComponent extends DataTableContainer<any> implements OnInit {


  constructor(
    route: ActivatedRoute,
    router: Router,
    private modalService: NzModalService
  ) {
    super(route, router);
  }

  ngOnInit(): void {
  }

  protected fetch(): Observable<QueryResult<any>> {
    return of(null);
  }

  addVoucher() {
    this.modalService.create({
      nzContent: VoucherFormComponent,
      nzTitle: 'Thêm mới mã giảm giá',
    });
  }
}
