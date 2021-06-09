import { Injectable } from '@angular/core';
import { QueryResult, User } from 'types/typemodel';
import { BaseApi } from './base-api';

@Injectable({
  providedIn: 'root'
})
export class AssistanceApiService extends BaseApi {
  endpoint = 'assistances';

  getList(params: {
    limit: number,
    page: number,
    q: number
  }) {
    return this.httpClient.get<QueryResult<User>>(this.createUrl(''), { params: this.createParams(params) });
  }
}
