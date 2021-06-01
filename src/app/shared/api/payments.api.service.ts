import { Injectable } from '@angular/core';
import { BaseApi } from './base-api';
import { Payment } from 'types/typemodel';

@Injectable({
  providedIn: 'root',
})
export class PaymentsApiService extends BaseApi {
  endpoint = 'setting-payments';

  getList() {
    return this.httpClient.get<Payment[]>(this.createUrl(''));
  }
}
