import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { Observable, timer } from 'rxjs';
import * as moment from 'moment';
import { switchMap } from 'rxjs/operators';
import { environment } from '@env';

export interface ITokenDecode {
  id: string;
  exp: number;
  iat: number;
  role: string;
}

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private baseUrl = `${environment.api}/auth/refresh`;

  constructor(
    private httpClient: HttpClient
  ) { }

  refreshTokenFn() {
    const refreshToken = localStorage.getItem('refreshToken');
    const { exp } = jwt_decode(localStorage.getItem('token')) as ITokenDecode;
    const timerReset = moment(exp * 1_000).subtract(new Date().getTime(), 'ms').unix() * 1_000 - 100_000;
    timer(timerReset).pipe(switchMap(() => this.getNewToken({ refreshToken }))).subscribe(res => {
      localStorage.setItem('token', res.accessToken);
      console.log('refffffffffff');
      this.refreshTokenFn();
    });
  }

  private getNewToken(params: { refreshToken: string }): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}`, { params });
  }
}
