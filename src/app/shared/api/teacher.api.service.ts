import { Injectable } from '@angular/core';
import { QueryResult, TeacherCreateCommand, TeacherUpdateCommand, User } from 'types/typemodel';
import { BaseApi } from './base-api';

@Injectable({
  providedIn: 'root',
})
export class TeacherApiService extends BaseApi {
  endpoint = 'teachers';

  getList(params: {
    limit: number,
    page: number,
    q: string,
    specializationId?: string
  }) {
    return this.httpClient.get<QueryResult<User>>(this.createUrl(''), {
      params: this.createParams(params),
    });
  }

  create(body: TeacherCreateCommand) {
    return this.httpClient.post(this.createUrl(''), body);
  }

  getById(id) {
    return this.httpClient.get<User>(this.createUrl(`/${id}`));
  }

  update(id: string, body: TeacherUpdateCommand) {
    return this.httpClient.put<any>(this.createUrl(`/${id}`), body);
  }

  delete(id) {
    return this.httpClient.delete(this.createUrl(`/${id}`));
  }
}
