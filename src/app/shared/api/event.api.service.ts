import { Injectable } from '@angular/core';
import { EventEntity, QueryResult } from 'types/typemodel';
import { BaseApi } from './base-api';

@Injectable({
  providedIn: 'root'
})
export class EventApiService extends BaseApi {
  endpoint = 'events';

  getList(params: {
    page: number,
    limit: number,
    q: string,
    status: any,
    typeIds: string[]
  }) {
    return this.httpClient.get<QueryResult<EventEntity>>(this.createUrl(''), { params: this.createParams(params) });
  }

  getById(id: string) {
    return this.httpClient.get<EventEntity>(this.createUrl(`/${id}`));
  }

  getByUser(id: string, params = {}) {
    return this.httpClient.get<any>(this.createUrl(`/student/${id}`), { params });
  }

  update(id: string, body: any) {
    return this.httpClient.put(this.createUrl(`/${id}`), body);
  }

  create(body: any) {
    return this.httpClient.post(this.createUrl(``), body);
  }
}
