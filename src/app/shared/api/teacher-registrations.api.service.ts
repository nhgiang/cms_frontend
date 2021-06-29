import { Injectable } from '@angular/core';
import { Partner, QueryResult } from 'types/typemodel';
import { BaseApi } from './base-api';

@Injectable({
  providedIn: 'root',
})
export class TeacherRegistrationsApiService extends BaseApi {
  endpoint = 'teacher-registrations';

  getList(params: { page: number; q: string }) {
    return this.httpClient.get<QueryResult<Partner>>(this.createUrl(''), {
      params: this.createParams(params),
    });
  }

  delete(id: string) {
    return this.httpClient.delete(this.createUrl(`/${id}`));
  }

  update(id: string, data: any) {
    return this.httpClient.put(this.createUrl(`/${id}`), data);
  }

  getById(id) {
    return this.httpClient.get<any>(this.createUrl(`/${id}`));
  }
}
