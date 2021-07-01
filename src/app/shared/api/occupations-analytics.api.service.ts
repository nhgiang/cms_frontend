import { Injectable } from '@angular/core';
import { BaseApi } from './base-api';

@Injectable({
  providedIn: 'root',
})
export class OccupationsAnalyticsApiService extends BaseApi {
  endpoint = 'occupations/analytics';

  get() {
    return this.httpClient.get(this.createUrl(''));
  }
}
