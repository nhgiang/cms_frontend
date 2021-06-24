import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '@env';
import { TokenService } from './token.service';
import { User } from 'types/typemodel';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private baseURL = `${environment.api}/auth`;
  private currentUserSubject: BehaviorSubject<User>;
  readonly currentUser: Observable<User>;
  anonymousPartnerId$: BehaviorSubject<any>;
  partnerId: string;

  constructor(
    private httpClient: HttpClient,
    private tokenService: TokenService
  ) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
    this.anonymousPartnerId$ = new BehaviorSubject<any>(null);
    this.anonymousPartnerId$.next(JSON.parse(localStorage.getItem('impersonation')));
  }

  anonymousPartnerValue(): any {
    return this.anonymousPartnerId$.getValue() || JSON.parse(localStorage.getItem('impersonation'));
  }

  storageAnonymousPartnerValue(value: any) {
    localStorage.setItem('impersonation', JSON.stringify(value));
    this.anonymousPartnerId$.next(value);
  }

  clearAnonymous() {
    localStorage.removeItem('impersonation');
    this.anonymousPartnerId$.next(null);
  }

  private get currentUserValue(): User {
    return this.currentUserSubject.getValue();
  }

  private set currentUserValue(value: User) {
    this.currentUserSubject.next(value);
  }

  login(body: { email: string; password: string; }) {
    return this.httpClient.post<any>(`${this.baseURL}/cms-login`, body);
  }

  getMe() {
    return this.httpClient.get<any>(`${this.baseURL}/me`).pipe(tap(user => this.storeUser(user)));
  }

  logout() {
    this.tokenService.destroySubject.next();
    this.tokenService.destroySubject.complete();
    localStorage.clear();
    this.currentUserSubject.next(null);
    this.anonymousPartnerId$.next(null);
  }

  private storeUser(user: any) {
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUserSubject.next(user);
  }

  update(values: any) {
    const nextVal = Object.assign({}, this.currentUserValue, values);
    this.currentUserValue = nextVal;
  }
}
