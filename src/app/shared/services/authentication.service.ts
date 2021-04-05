import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from '../interfaces/user.type';
import { environment } from '@env';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private baseURL = `${environment.api}/auth`;
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private httpClient: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(body: { username: string; password: string; }) {
        return this.httpClient.post<any>(`${this.baseURL}/cms-login`, body);
    }

    getMe() {
        return this.httpClient.get<any>(`${this.baseURL}/me`).pipe(tap(user => this.storeUser(user)));
    }

    logout() {
        localStorage.clear();
        this.currentUserSubject.next(null);
    }

    private storeUser(user: any) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
    }
}
