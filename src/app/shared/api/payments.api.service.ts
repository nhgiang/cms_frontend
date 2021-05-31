import { Injectable } from '@angular/core';
import { BaseApi } from './base-api';

@Injectable({
  providedIn: 'root',
})
export class PaymentsApiService extends BaseApi {
  endpoint = 'setting-payments';

  getList() {
    return this.httpClient.get<any>(this.createUrl(''));
  }
}
