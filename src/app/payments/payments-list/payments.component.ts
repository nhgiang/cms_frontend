import { Component, OnInit } from '@angular/core';
import { PaymentsApiService } from '@shared/api/payments.api.service';
import { Payment } from 'types/typemodel';
import { finalize } from 'rxjs/operators';
@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
})
export class PaymentsComponent implements OnInit {
  payments: Payment[] = [];
  isDataLoading = false;
  isPreview: number = 0;
  constructor(private paymentsService: PaymentsApiService) {}
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
}
