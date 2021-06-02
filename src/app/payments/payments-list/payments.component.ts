import { Component, OnInit } from '@angular/core';
import { PaymentsApiService } from '@shared/api/payments.api.service';
import { Payment } from 'types/typemodel';
import { finalize, switchMap, tap } from 'rxjs/operators';
import { NzNotificationService } from 'ng-zorro-antd/notification';
@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
})
export class PaymentsComponent implements OnInit {
  payments: Payment[] = [];
  isDataLoading = false;
  isPreview: number = 0;
  constructor(
    private paymentsService: PaymentsApiService,
    private notif: NzNotificationService
  ) {}
  ngOnInit() {
    this.fetchAndSubcribe();
  }

  fetchAndSubcribe() {
    this.isDataLoading = true;
    this.paymentsService
      .getList()
      .pipe(finalize(() => (this.isDataLoading = false)))
      .subscribe((data: Payment[]) => {
        this.payments = data;
      });
  }

  preview() {
    this.isPreview++;
    //force app-payments-preview update
  }

  deletePayment(payment: Payment) {
    this.isDataLoading = true;
    this.payments.splice(this.payments.indexOf(payment));
    this.paymentsService
      .postDelete(this.payments)
      .pipe(
        tap(() => {
          this.notif.success(
            'Thành công',
            'Xóa phương thức thanh toán thành công!'
          );
        }),
        switchMap(() => {
          return this.paymentsService.getList();
        }),
        finalize(() => (this.isDataLoading = false))
      )
      .subscribe((data: Payment[]) => {
        this.payments = data;
      });
  }
}
