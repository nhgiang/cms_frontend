import { BaseApi } from './base-api';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RoyaltiesAnalyticsApiService extends BaseApi {
  commissionsEndpoint = 'teacher-royalty';

  getStudentView(params?: { [key: string]: any }) {
    return this.httpClient.get(
      this.createUrl(this.commissionsEndpoint + '/student-view'),
      {
        params: this.createParams(params),
      }
    );
  }

  getTeacherView(params?: { [key: string]: any }) {
    return this.httpClient.get(
      this.createUrl(this.commissionsEndpoint + '/teacher-view'),
      {
        params: this.createParams(params),
      }
    );
  }
}
