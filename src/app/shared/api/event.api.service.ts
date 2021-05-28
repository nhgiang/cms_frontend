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

  getById(id) {
    return this.httpClient.get<EventEntity>(this.createUrl(`/${id}`));
  }

  update(id: string, body) {
    return this.httpClient.put(this.createUrl(`/${id}`), body);
  }

  create(body: any) {
    return this.httpClient.post(this.createUrl(``), body);
  }
}
