import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from 'types/models/course';
import { QueryResult } from 'types/typemodel';
import { BaseApi } from './base-api';

@Injectable({
  providedIn: 'root'
})
export class CourseApiService extends BaseApi {
  endpoint = 'courses';

  getList(params) {
    return this.httpClient.get<QueryResult<Course>>(this.createUrl(''), { params: this.createParams(params) });
  }

  create(body: any): Observable<Course> {
    return this.httpClient.post<Course>(this.createUrl(''), body);
  }
}
