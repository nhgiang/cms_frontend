import { Component, OnInit } from '@angular/core';
import { PaymentsApiService } from '@shared/api/payments.api.service';
import { Payment } from 'types/typemodel';
import { finalize, switchMap, tap } from 'rxjs/operators';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzModalService } from 'ng-zorro-antd/modal';
import { PaymentsUpsertComponent } from '../payments-upsert/payments-upsert.component';
@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
})
export class PaymentsComponent implements OnInit {
  payments: Payment[] = [];
  isDataLoading = false;
  isPreview = false;

  isUpsertModalVisible = false;

  constructor(
    private paymentsApi: PaymentsApiService,
    private notif: NzNotificationService,
    private modalService: NzModalService
  ) {}

  ngOnInit() {
    this.fetch().subscribe((data: Payment[]) => {
      this.payments = data;
    });
  }

  fetch() {
    this.isDataLoading = true;
    return this.paymentsApi
      .getList()
      .pipe(finalize(() => (this.isDataLoading = false)));
  }

  deletePayment(payment: Payment) {
    this.isDataLoading = true;
    this.payments.splice(this.payments.indexOf(payment), 1);
    this.paymentsApi
      .postWhole(this.payments)
      .pipe(
        tap(() => {
          this.notif.success(
            'Thành công',
            'Xóa thông tin ngân hàng thành công!'
          );
        }),
        switchMap(() => {
          return this.paymentsApi.getList();
        }),
        finalize(() => (this.isDataLoading = false))
      )
      .subscribe((data: Payment[]) => {
        this.payments = data;
      });
  }

  editPayment(paymentIndex: number) {
    const modalRef = this.modalService.create({
      nzTitle: 'Thông tin ngân hàng',
      nzContent: PaymentsUpsertComponent,
      nzComponentParams: {
        targetEditIndex: paymentIndex,
        paymentsList: this.payments,
      },
      nzCentered: true,
    });
    modalRef.componentInstance.success
      .pipe(
        tap(() => {
          modalRef.close();
          this.notif.success(
            'Thành công',
            'Cập nhật thông tin ngân hàng thành công'
          );
        }),
        switchMap(() => this.fetch())
      )
      .subscribe((data: Payment[]) => (this.payments = data));
  }

  createPayment() {
    const modalRef = this.modalService.create({
      nzTitle: 'Thông tin ngân hàng',
      nzContent: PaymentsUpsertComponent,
      nzComponentParams: {
        paymentsList: this.payments,
        targetEditIndex: null,
      },
      nzCentered: true,
    });
    modalRef.componentInstance.success
      .pipe(
        tap(() => {
          modalRef.close();
          this.notif.success(
            'Thành công',
            'Thêm thông tin ngân hàng thành công!'
          );
        }),
        switchMap(() => this.fetch())
      )
      .subscribe((data: Payment[]) => {
        this.payments = data;
      });
  }
}
