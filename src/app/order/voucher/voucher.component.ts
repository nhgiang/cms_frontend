import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VoucherApiService } from '@shared/api/voucher.api.service';
import { DataTableContainer } from '@shared/class/data-table-container';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Observable, of } from 'rxjs';
import { QueryResult } from 'types/typemodel';
import { VoucherFormComponent, VoucherTarget } from './voucher-form/voucher-form.component';
export enum SuffixValue {
  PERCENTAGE = 'PERCENTAGE',
  CURRENCY = 'CURRENCY'
}
@Component({
  selector: 'app-voucher',
  templateUrl: './voucher.component.html',
  styleUrls: ['./voucher.component.scss']
})
export class VoucherComponent extends DataTableContainer<any> implements OnInit {
  VoucherTarget = VoucherTarget;
  SuffixValue = SuffixValue;
  constructor(
    route: ActivatedRoute,
    router: Router,
    private modalService: NzModalService,
    private voucherApiService: VoucherApiService
  ) {
    super(route, router);
  }

  protected fetch(): Observable<QueryResult<any>> {
    const params = {
      limit: this.quantity,
      page: this.page,
      order: this.order,
      sort: this.sort
    };
    const { q, isActive, endAt, startAt } = this.params;
    return this.voucherApiService.getList({ ...params, isActive, q, endAt, startAt });
  }

  addVoucher() {
    const modalRef = this.modalService.create({
      nzContent: VoucherFormComponent,
      nzTitle: 'Thêm mới mã giảm giá',
    });
    modalRef.componentInstance.refresh.subscribe(() => {
      this.refresh();
    });
  }

  toggleStatus(value, id) {
    this.voucherApiService.update(id, { isActive: value }).subscribe(() => {
      this.refresh();
    });
  }

  viewDetail(id) {
    const modalRef = this.modalService.create({
      nzContent: VoucherFormComponent,
      nzTitle: 'Thêm mới mã giảm giá',
      nzComponentParams: { id }
    });
  }
}
