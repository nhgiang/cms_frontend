import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthenticationService } from '@shared/services/authentication.service';
import { TokenService } from '@shared/services/token.service';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthorizeGuard implements CanActivate {
  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private tokenService: TokenService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.authService.getMe().pipe(
      map(user => {
        this.tokenService.refreshTokenFn();
        return user.role === 'Admin';
      }),
      catchError(e => {
        this.router.navigate(['/authentication/login']);
        return of(false);
      }));
  }
}
