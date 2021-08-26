import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from 'types/models/course';
import { QueryResult } from 'types/typemodel';
import { BaseApi } from './base-api';

@Injectable({
  providedIn: 'root',
})
export class CourseApiService extends BaseApi {
  endpoint = 'courses';

  getList(params) {
    return this.httpClient.get<QueryResult<Course>>(this.createUrl(''), {
      params: this.createParams(params),
    });
  }

  create(body: any): Observable<Course> {
    return this.httpClient.post<Course>(this.createUrl(''), body);
  }

  update(id: string, body: Course): Observable<Course> {
    return this.httpClient.put<Course>(this.createUrl(`/${id}`), body);
  }

  getById(id: string): Observable<Course> {
    return this.httpClient.get<Course>(this.createUrl(`/${id}`));
  }

  getByUser(id: string, params: any): Observable<any> {
    return this.httpClient.get<any>(this.createUrl(`/find/${id}`), {
      params: this.createParams(params),
    });
  }

  getInfoOfCourseHottest(params) {
    return this.httpClient.get<QueryResult<Course>>(this.createUrl(''), {
      params,
    });
  }

  publish(id) {
    return this.httpClient.patch(this.createUrl(`/${id}/publish`), null);
  }

  comment(params: any): Observable<any> {
    return this.httpClient.get(this.createUrl('/comments'), {
      params: this.createParams(params),
    });
  }

  hidden(id: string, body: any): Observable<any> {
    return this.httpClient.put(this.createUrl(`/hidden/${id}`), body);
  }

  count() {
    return this.httpClient.get(this.createUrl('/count'));
  }

  delete(id: string) {
    return this.httpClient.delete(this.createUrl(`/${id}`));
  }
}
