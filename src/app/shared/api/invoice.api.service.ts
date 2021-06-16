import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Invoice, QueryResult } from 'types/typemodel';
import { download } from 'utils/common';
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
    endDate: Date,
    type?: string
  }) {
    return this.httpClient.get<QueryResult<Invoice>>(this.createUrl(''), { params: this.createParams(params) });
  }

  getById(id) {
    return this.httpClient.get<Invoice>(this.createUrl(`/${id}`));
  }

  update(id, body: any) {
    return this.httpClient.put(this.createUrl(`/${id}`), body);
  }

  downloadExcel(params: {
    q: string,
    status: any,
    startDate: Date,
    endDate: Date
  }) {
    return this.httpClient.get(this.createUrl(`/download`), { params: this.createParams(params), responseType: 'blob' }).pipe(tap(res => {
      download(
        res,
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Danh sách hóa đơn thanh toán ' + new Date().getTime().toString()
      );
    }));
  }

  download(id: string) {
    return this.httpClient.get(this.createUrl(`/${id}/bill`), { responseType: 'blob' }).pipe(tap(res => download(res, 'application/pdf', 'Hóa đơn thanh toán ' + new Date().getTime().toString())));
  }

  downloadExcelReport(params: {
    q: string,
    status: any,
    startDate: Date,
    endDate: Date,
    type?: string
  }) {
    return this.httpClient.get(this.createUrl(`/download/analytics`), { params: this.createParams(params), responseType: 'blob' }).pipe(tap(res => {
      download(
        res,
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Báo cáo doanh thu chi tiết ' + new Date().getTime().toString()
      );
    }));
  }
}
