import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env';
import jwt_decode from 'jwt-decode';
import * as moment from 'moment';
import { Observable, Subject, timer } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';

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

  public destroySubject: Subject<any>;
  private baseUrl = `${environment.api}/auth/refresh`;

  constructor(
    private httpClient: HttpClient
  ) {
    this.destroySubject = new Subject();
  }

  refreshTokenFn() {
    const { exp } = jwt_decode(localStorage.getItem('token')) as ITokenDecode;
    const timerReset = moment(exp * 1_000).subtract(new Date().getTime(), 'ms').unix() * 1_000 - 100_000;
    setTimeout(() => {
      const refreshToken = localStorage.getItem('refreshToken');
      if (!refreshToken) { return; }
      this.getNewToken({ refreshToken }).subscribe(res => {
        localStorage.setItem('token', res.accessToken);
        this.refreshTokenFn();
      });
    }, timerReset);
  }

  private getNewToken(params: { refreshToken: string }): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}`, { params });
  }
}
