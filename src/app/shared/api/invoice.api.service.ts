import { Injectable } from '@angular/core';
import { Invoice, QueryResult } from 'types/typemodel';
import { BaseApi } from './base-api';

@Injectable({
  providedIn: 'root'
})
export class InvoiceApiService extends BaseApi {
  endpoint = 'invoices';

  getList(params: {
    page: number,
    limit: number,
    q: string,
    status: any,
    startDate: Date,
    endDate: Date
  }) {
    return this.httpClient.get<QueryResult<Invoice>>(this.createUrl(''), { params: this.createParams(params) });
  }

  getById(id) {
    return this.httpClient.get<Invoice>(this.createUrl(`/${id}`));
  }

  update(id, body: any) {
    return this.httpClient.put(this.createUrl(`/${id}`), body);
  }
}
