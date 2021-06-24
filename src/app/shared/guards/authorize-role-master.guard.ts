import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthenticationService } from '@shared/services/authentication.service';
import { Router } from '@angular/router';
import { User } from 'types/typemodel';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthorizeRoleMasterGuard implements CanActivate {
  currentUser: User;
  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.authService.currentUser.pipe(
      map((user) => {
        if (user.role === 'Admin' && user.isMaster) return true;
        this.router.navigateByUrl('authentication/error/404');
        return false;
      })
    );
  }
}
