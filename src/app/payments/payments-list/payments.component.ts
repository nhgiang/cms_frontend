import { Component, OnInit } from '@angular/core';
import { PaymentsApiService } from '@shared/api/payments.api.service';
import { Payment } from 'types/typemodel';
import { finalize, switchMap, tap } from 'rxjs/operators';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Router } from '@angular/router';
@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
})
export class PaymentsComponent implements OnInit {
  payments: Payment[] = [];
  isDataLoading = false;
  isPreview: number = 0;
  constructor(
    private paymentsApi: PaymentsApiService,
    private notif: NzNotificationService,
    private router: Router
  ) {}
  ngOnInit() {
    this.fetchAndSubcribe();
  }

  fetchAndSubcribe() {
    this.isDataLoading = true;
    this.paymentsApi
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
    this.paymentsApi
      .postWhole(this.payments)
      .pipe(
        tap(() => {
          this.notif.success(
            'Thành công',
            'Xóa phương thức thanh toán thành công!'
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

  navigate(paymentIndex: number) {
    this.router.navigate(['/payments/create'], {
      state: {
        targetEditIndex: paymentIndex,
      },
    });
  }
}
