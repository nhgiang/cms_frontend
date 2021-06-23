import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { trimData } from 'utils/common';
import { AuthenticationService } from '@shared/services/authentication.service';
@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private authenticationService: AuthenticationService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');
    if (this.authenticationService.partnerId) {
      if (token) {
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`,
            'partner-id': this.authenticationService.partnerId
          },
          body: request.body && trimData(request.body)
        });
      } else {
        request = request.clone({
          setHeaders: {
            'partner-id': this.authenticationService.partnerId
          },
          body: request.body && trimData(request.body)
        });
      }
    }
    return next.handle(request);
  }
}
