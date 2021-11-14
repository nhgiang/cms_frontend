import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env';
import jwt_decode from 'jwt-decode';
import * as moment from 'moment';
import { BehaviorSubject, Observable, Subject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

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
  // private token$: BehaviorSubject<string>;
  // public tokenObs: Observable<string>;
  private baseUrl = `${environment.api}/auth/refresh`;
  private _token: string = localStorage.getItem('token');
  get token() {
    return this._token;
  }

  set token(token: any) {
    this._token = token;
    localStorage.setItem('token', token);
  }

  private _refreshToken: string = localStorage.getItem('refreshToken');
  get refreshToken() {
    return this._refreshToken;
  }

  set refreshToken(refreshToken: any) {
    this._refreshToken = refreshToken;
    localStorage.setItem('refreshToken', refreshToken);
  }

  constructor(
    private httpClient: HttpClient
  ) {
    this.destroySubject = new Subject();
  }

  // refreshTokenFn() {
  //   const { exp } = jwt_decode<ITokenDecode>(localStorage.getItem('token'));
  //   const timerReset = moment(exp * 1_000).subtract(new Date().getTime(), 'ms').unix() * 1_000 - 100_000;
  //   setTimeout(() => {
  //     const refreshToken = localStorage.getItem('refreshToken');
  //     if (!refreshToken) { return; }
  //     this.getNewToken({ refreshToken }).subscribe(res => {
  //       localStorage.setItem('token', res.accessToken);
  //       this.token$.next(res.accessToken)
  //       this.refreshTokenFn();
  //     });
  //   }, timerReset);
  // }

  getNewToken(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}`, { params: { refreshToken: this.refreshToken } }).pipe(tap(res => {
      this.token = res.token;
    }));
  }


}
