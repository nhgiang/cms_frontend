import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { AuthenticationService } from '@shared/services/authentication.service';
import { tap } from 'rxjs/operators';
import { BaseApi } from './base-api';
import { API_BASE_URL } from './base-url';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService extends BaseApi {
  endpoint = 'auth';
  constructor(
    httpClient: HttpClient,
    @Inject(API_BASE_URL) protected hostUrl: string,
    private authService: AuthenticationService
  ) {
    super(httpClient, hostUrl);
  }

  forgotPassword(body: { email: string }) {
    return this.httpClient.post(this.createUrl('/cms-recover-password'), body);
  }

  resetPassword(body: { email: string; newPassword: string; otp: string }) {
    return this.httpClient.post(this.createUrl('/reset-password'), body);
  }

  changePassword(body: { oldPassword: string; newPassword: string }) {
    return this.httpClient.post(this.createUrl('/change-password'), body);
  }

  changeAvatar(body: { avatar: string }) {
    return this.httpClient.post(this.createUrl('/update-avatar'), body).pipe(tap(() => {
      this.authService.update(body);
    }));
  }
}
