import { Injectable } from '@angular/core';
import { BaseApi } from './base-api';

@Injectable({
  providedIn: 'root',
})
export class PartnersCoursesApiService extends BaseApi {
  endpoint = 'master/partners-courses-analytics';

  analytics() {
    return this.httpClient.get(this.createUrl(''));
  }
}
