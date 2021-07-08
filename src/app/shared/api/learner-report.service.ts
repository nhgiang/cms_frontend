import { Injectable } from '@angular/core';
import { QueryResult } from 'types/typemodel';
import { BaseApi } from './base-api';

@Injectable({
  providedIn: 'root'
})
export class LearnerReportApiService extends BaseApi {
  endpoint = 'learner-report';

  analytics(params: {
    page: number,
    limit: number,
    sort: string,
    order: string,
  }) {
    return this.httpClient.get<QueryResult<any>>(this.createUrl(''), { params: this.createParams(params) });
  }
}
