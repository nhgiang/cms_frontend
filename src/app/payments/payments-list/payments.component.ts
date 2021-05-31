import { Component, OnInit } from '@angular/core';
import { environment } from '@env';
import { PaymentsApiService } from '@shared/api/payments.api.service';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
})
export class PaymentsComponent implements OnInit {
  data = [];
  constructor(private paymentsService: PaymentsApiService) {}
  ngOnInit() {
    this.fetch();
  }

  fetch() {
    this.paymentsService.getList().subscribe((data) => {
      this.data = data;
      console.log('hasd');
    });
  }
}

const API = `${environment.api}/setting-payments`;
