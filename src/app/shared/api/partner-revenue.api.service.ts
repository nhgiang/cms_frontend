import { Injectable } from '@angular/core';
import { QueryResult } from 'types/typemodel';
import { BaseApi } from './base-api';

@Injectable({
  providedIn: 'root',
})
export class PartnerRevenueApiService extends BaseApi {
  endpoint = 'partner-revenue-analystics';

  getList(params: any) {
    return this.httpClient.get<QueryResult<any>>(
      this.createUrl(''),
      { params: this.createParams(params) }
    );
  }
}
