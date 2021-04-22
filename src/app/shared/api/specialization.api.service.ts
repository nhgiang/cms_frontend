import { Injectable } from '@angular/core';
import { Specialization } from 'types/models/course';
import { QueryResult } from 'types/typemodel';
import { BaseApi } from './base-api';

@Injectable({
  providedIn: 'root'
})
export class SpecializationApiService extends BaseApi {
  endpoint = 'specializations';

  getAll(params) {
    return this.httpClient.get<QueryResult<Specialization>>(this.createUrl(''), { params: this.createParams(params) });
  }

  getById(id) {
    return this.httpClient.get<Specialization>(this.createUrl(`/${id}`));
  }

  create(name: string) {
    return this.httpClient.post<any>(this.createUrl(``), { name });
  }

  update(id, body) {
    return this.httpClient.put<any>(this.createUrl(`/${id}`), body);
  }

  delete(id) {
    return this.httpClient.delete<any>(this.createUrl(`/${id}`));
  }
}
