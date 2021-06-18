import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import jwt_decode from 'jwt-decode';
import { ITokenDecode } from '@shared/services/token.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private notification: NzNotificationService
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError((error: HttpErrorResponse) => {
      if (!navigator.onLine) {
        this.notification.error('Thất bại', 'Đường truyền mạng không ổn định. Vui lòng thử lại sau!');
      } else if (error.status === 401) {
        // tslint:disable-next-line: max-line-length
        if (localStorage.getItem('token') && Number(jwt_decode<ITokenDecode>(localStorage.getItem('token'))?.exp) > Number(new Date().getTime()) / 1000) {
          this.notification.warning('', 'Tài khoản của bạn đã đăng nhập ở một thiết bị khác hoặc tạm thời bị khóa.');
        }
        localStorage.clear();
        location.href = '/authentication/login';
      } else if ([403, 404, 500].includes(error.status)) {
        this.router.navigate(['/authentication/error', error.status]);
      }
      return throwError(error);
    }));
  }
}
