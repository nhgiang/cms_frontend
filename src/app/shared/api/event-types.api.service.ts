import { Injectable } from '@angular/core';
import { BaseApi } from './base-api';
import { QueryResult, EventType } from 'types/typemodel';
import { HttpParams } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class EventTypesApiService extends BaseApi {
  endpoint = 'event-types';

  getList(params: { page: number }) {
    let _params = new HttpParams().set('page', params.page.toString());

    return this.httpClient.get<QueryResult<EventType>>(this.createUrl(''), {
      params: _params,
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
