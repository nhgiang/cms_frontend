import { Injectable } from '@angular/core';
import { BaseApi } from './base-api';

@Injectable({
  providedIn: 'root'
})
export class ReportsApiService extends BaseApi {
  endpoint = '';

  getRevenue(params) {
    return this.httpClient.get(this.createUrl('revenue/analytics'), { params });
  }
}
