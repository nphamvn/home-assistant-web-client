import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, distinctUntilChanged, map, Observable, of, ReplaySubject, take } from 'rxjs';
import { User } from '../models/user';
import { ApiService } from './api.service';
import { JwtService } from './jwt.service';

import * as signalr from '@microsoft/signalr';
import { ChatService } from 'src/app/chat/chat.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {


  private currentUserSubject = new BehaviorSubject<User>({} as User);
  public currentUser = this.currentUserSubject.asObservable().pipe(distinctUntilChanged());

  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();

  constructor(private apiService: ApiService, private jwtService: JwtService) { }

  // Verify JWT in localstorage with server & load user's info.
  // This runs once on application startup.
  populate() {
    // If JWT detected, attempt to get & store user's info
    if (this.jwtService.getToken()) {
      this.apiService.get('/account/token')
        .subscribe({
          next: user => this.setAuth(user),
          error: () => {
            this.purgeAuth()
          }
        });
    } else {
      // Remove any potential remnants of previous auth states
      this.purgeAuth();
    }
  }

  purgeAuth(): Observable<any> {
    // Remove JWT from localstorage
    this.jwtService.destroyToken();
    // Set current user to an empty object
    this.currentUserSubject.next({} as User);
    // Set auth status to false
    this.isAuthenticatedSubject.next(false);
    //TODO: send request to logout
    return of(true);
  }

  logIn(credentials: any): Observable<User> {
    return this.apiService.post('/account/login', credentials)
      .pipe(map(
        user => {
          if (user) {
            this.setAuth(user);
            return user;
          }
        }
      ));
  }

  setAuth(user: User) {
    // Save JWT sent from server in localstorage
    this.jwtService.saveToken(user.accessToken);
    // Set current user data into observable
    this.currentUserSubject.next(user);
    // Set isAuthenticated to true
    this.isAuthenticatedSubject.next(true);
  }

  register(model: any): Observable<User> {
    return this.apiService.post('/account/register', model)
      .pipe(map(
        user => {
          if (user) {
            this.setAuth(user);
            return user;
          }
        }
      ));
  }

  changePassword(form: { currentPassword: string; newPassword: string; confirmPassword: string; }): Observable<any> {
    //throw new Error('Method not implemented.');
    return this.apiService.post('/account/change-password', form);
  }

  hasRole(role: string): boolean {
    const token = this.jwtService.getToken();
    let payload = token.split('.')[1];
    let decoded = window.atob(payload);
    const values = JSON.parse(decoded);
    const roles = values.role;
    if (roles.isArray) {
      return roles.includes(role);
    }
    else {
      return roles === role;
    }
  }
}
