import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import jwt_decode from 'jwt-decode';
import { ITokenDecode } from '@shared/services/token.service';
import * as moment from 'moment';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private notification: NzNotificationService
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        // check token còn hạn mà bị 401
        if (moment((jwt_decode(localStorage.getItem('token')) as ITokenDecode).exp, 'x').isBefore(moment(), 'seconds')) {
          this.notification.warning('', 'Tài khoản của bạn đã được đăng nhập ở một thiết bị khác hoặc đã bị tạm khóa!');
        }
        localStorage.clear();
        this.router.navigate(['/authentication/login']);
      } else if ([403, 404, 500].includes(error.status)) {
        this.router.navigate(['/authentication/error', error.status]);
      }
      return throwError(error);
    }));
  }
}
