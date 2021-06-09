import { BaseApi } from './base-api';
import { Injectable } from '@angular/core';
import { Vnpay } from 'types/typemodel';

@Injectable({
  providedIn: 'root',
})
export class VnpayApiService extends BaseApi {
  endpoint = 'setting-vnpays';

  get() {
    return this.httpClient.get<Vnpay>(this.createUrl(''));
  }
  update(params: Vnpay) {
    return this.httpClient.post(
      this.createUrl(''),
      this.createParams({
        tmnCode: params.tmnCode,
        hashSecret: params.hashSecret,
      })
    );
  }
}
