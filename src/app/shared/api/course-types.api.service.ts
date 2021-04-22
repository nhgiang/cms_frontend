import { Injectable } from '@angular/core';
import { CourseType, QueryResult } from 'types/typemodel';
import { BaseApi } from './base-api';

@Injectable({
  providedIn: 'root'
})
export class CourseTypesApiService extends BaseApi {
  endpoint = 'course-types';

  getList(params: { page: number, limit: number }) {
    return this.httpClient.get<QueryResult<CourseType>>(this.createUrl(''), { params: this.createParams(params) });
  }

  create(name: string) {
    return this.httpClient.post(this.createUrl(''), { name });
  }

  delete(id: string) {
    return this.httpClient.delete(this.createUrl(`/${id}`));
  }

  getById(id: string) {
    return this.httpClient.get<CourseType>(this.createUrl(`/${id}`));
  }

  update(id: string, body: { name: string, id: string }) {
    return this.httpClient.put(this.createUrl(`/${id}`), body);
  }
}
