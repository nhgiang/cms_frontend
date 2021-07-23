import { Injectable } from '@angular/core';
import { UserStatus } from 'types/enums';
import { BaseApi } from './base-api';

@Injectable({
  providedIn: 'root'
})
export class UserApiService extends BaseApi {
  endpoint = 'users';

  updateStatus(id, body: { id: string, status: UserStatus }) {
    return this.httpClient.patch<any>(this.createUrl(`/${id}/update-status`), body);
  }

  getAllActive(params: any) {
    return this.httpClient.get<any>(this.createUrl(''), { params: this.createParams({ ...params, status: 'Active' }) });
  }
}
