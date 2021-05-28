import { Injectable } from '@angular/core';
import { EventType, QueryResult } from 'types/typemodel';
import { BaseApi } from './base-api';

@Injectable({
  providedIn: 'root'
})
export class EventTypeApiService extends BaseApi {
  endpoint = 'event-types';

  getList(params: {
    page: number,
    limit: number
  }) {
    return this.httpClient.get<QueryResult<EventType>>(this.createUrl(''), { params: this.createParams(params) });
  }
}
