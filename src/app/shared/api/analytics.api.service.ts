import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseApi } from './base-api';

@Injectable({
  providedIn: 'root',
})
export class AnalyticsApiService extends BaseApi {
  //dung chung cho tat ca loai bao cao
  coursesEndpoint = 'courses/analytics';

  getCourseAnalytics(params?: { [key: string]: any }) {
    return this.httpClient.get(this.createUrl(this.coursesEndpoint), {
      params: this.createParams(params),
    });
  }
}
