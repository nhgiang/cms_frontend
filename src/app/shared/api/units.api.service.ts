import { Injectable } from '@angular/core';
import { BaseApi } from './base-api';

@Injectable({
  providedIn: 'root'
})
export class UnitsApiService extends BaseApi {
  endpoint = 'units';

  createUnit(body) {
    return this.httpClient.post<any>(this.createUrl(``), body);
  }
}
