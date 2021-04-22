import { Injectable } from '@angular/core';
import { BaseApi } from './base-api';

@Injectable({
  providedIn: 'root'
})
export class AuthApiService extends BaseApi {

  endpoint = 'auth';

  forgotPassword(body: { email: string }) {
    return this.httpClient.post(this.createUrl('/cms-recover-password'), body);
  }

  resetPassword(body: { email: string, newPassword: string, otp: string }) {
    return this.httpClient.post(this.createUrl('/reset-password'), body);
  }
}
