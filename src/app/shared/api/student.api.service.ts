import { Injectable } from '@angular/core';
import { QueryResult, User } from 'types/typemodel';
import { BaseApi } from './base-api';

@Injectable({
  providedIn: 'root'
})
export class StudentApiService extends BaseApi {
  endpoint = 'students';

  getAll(params: {
    page: number,
    limit: number,
    q: string,
    status: string,
    specializationId: string
  }) {
    return this.httpClient.get<QueryResult<User>>(this.createUrl(''), { params: this.createParams(params) });
  }

  getById(id) {
    return this.httpClient.get<User>(this.createUrl(`/${id}`));
  }
}
