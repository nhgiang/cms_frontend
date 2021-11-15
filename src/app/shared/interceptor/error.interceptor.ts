import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import {
  catchError,
  filter,
  mergeMap,
  switchMap,
  take,
  tap,
} from 'rxjs/operators';
import jwt_decode from 'jwt-decode';
import { ITokenDecode, TokenService } from '@shared/services/token.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    null
  );

  constructor(
    private router: Router,
    private notification: NzNotificationService,
    private tokenService: TokenService
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError((error: HttpErrorResponse) => {
      if (!navigator.onLine) {
        this.notification.error('Thất bại', 'Đường truyền mạng không ổn định. Vui lòng thử lại sau!');
      } else if (error.status === 401) {
        // tslint:disable-next-line: max-line-length
       return this.handleError401(request, next, error);
      } else if ([403, 404, 500].includes(error.status)) {
        this.router.navigate(['/authentication/error', error.status]);
      }
      return throwError(error);
    }));
  }

  handleError401(request: HttpRequest<any>, next: HttpHandler, error: HttpErrorResponse) {
    // tslint:disable-next-line: max-line-length
    if (
      localStorage.getItem('token') &&
      Number(jwt_decode<ITokenDecode>(localStorage.getItem('token'))?.exp) >
        Number(new Date().getTime()) / 1000
    ) {
      this.notification.warning(
        '',
        'Tài khoản của bạn đã đăng nhập ở một thiết bị khác hoặc tạm thời bị khóa.'
      );
      this.logout();
      return;
    }
    // tslint:disable-next-line: max-line-length
    if (
      localStorage.getItem('refreshToken') &&
      Number(
        jwt_decode<ITokenDecode>(localStorage.getItem('refreshToken'))?.exp
      ) <
        Number(new Date().getTime()) / 1000
    ) {
      this.logout();
      this.isRefreshing = false;
      return;
    }

    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);
      return this.tokenService.getNewToken().pipe(
        mergeMap((res) => {
          this.isRefreshing = false;
          this.tokenService.token = res.accessToken;
          this.refreshTokenSubject.next(res.accessToken);
          return next.handle(this.injectToken(request));
        }),
        catchError((err) => {
          this.logout();
          return throwError(err);
        })
      );
    } else {
      return this.refreshTokenSubject.pipe(
        tap(() => {
          if (this.tokenService.refreshToken === null || (error && error.url.includes('refreshToken'))) {
            this.router.navigate(['/authentication/login']);
          }
        }),
        filter((token) => token != null),
        take(1),
        switchMap(() => {
          return next.handle(this.injectToken(request));
        })
      );
    }
  }

  injectToken(request: HttpRequest<any>) {
    const token = this.tokenService.token;
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  private logout() {
    localStorage.clear();
    location.href = '/authentication/login';
  }
}
