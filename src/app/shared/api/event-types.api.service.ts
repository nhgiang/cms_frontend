import { Injectable } from '@angular/core';
import { EventType, QueryResult } from 'types/typemodel';
import { BaseApi } from './base-api';
@Injectable({
  providedIn: 'root',
})
export class EventTypesApiService extends BaseApi {
  endpoint = 'event-types';

  getList(params: { page: number }) {
    return this.httpClient.get<QueryResult<EventType>>(this.createUrl(''), {
      params: this.createParams(params),
    });
  }
  create(title: string) {
    return this.httpClient.post(this.createUrl(''), { title });
  }
  update(id: string, body: { title: string }) {
    return this.httpClient.put(this.createUrl(`/${id}`), body);
  }
  delete(id: string) {
    return this.httpClient.delete(this.createUrl(`/${id}`));
  }
}
