import { Injectable } from '@angular/core';
import { ConsultingInformation, QueryResult } from 'types/typemodel';
import { BaseApi } from './base-api';

@Injectable({
  providedIn: 'root'
})
export class ContactApiService extends BaseApi {
  endpoint = 'contacts';
  getList(params: {
    page: number,
    limit: number,
    sort: string,
    order: string,
    q: string,
    status: string
  }) {
    return this.httpClient.get<QueryResult<ConsultingInformation>>(this.createUrl(''), { params: this.createParams(params) });
  }
}
