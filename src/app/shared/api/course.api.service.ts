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
}
