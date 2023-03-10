import { Injectable } from '@angular/core';
import { BaseApi } from './base-api';

export interface SettingMemberships {
  price: number;
  royaltyPercentage: number;
  days: number;
  courseDays: number; //
}
@Injectable({
  providedIn: 'root',
})
export class SettingMembershipsApiService extends BaseApi {
  endpoint = 'setting-memberships';
  get() {
    return this.httpClient.get<any>(this.createUrl(''));
  }
  post(params: SettingMemberships) {
    return this.httpClient.post(this.createUrl(''), this.createParams(params));
  }
}
