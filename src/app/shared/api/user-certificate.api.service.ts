import { Injectable } from '@angular/core';
import { BaseApi } from './base-api';

@Injectable({
  providedIn: 'root'
})
export class UserCertificationApiService extends BaseApi {
  endpoint = 'user-certificates';

  getByUser(id: string, params: {}) {
    return this.httpClient.get<any>(this.createUrl(`/student/${id}`), { params: this.createParams(params) });
  }
}
