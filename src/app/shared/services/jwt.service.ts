import { Injectable } from '@angular/core';
import { BehaviorSubject, distinctUntilChanged, ReplaySubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class JwtService {

  private currentToken = new ReplaySubject<string>();
  public currentTokenSubject = this.currentToken.asObservable().pipe(distinctUntilChanged());

  getToken(): string {
    return window.localStorage['jwtToken'];
  }

  saveToken(token: string) {
    window.localStorage['jwtToken'] = token;
    this.currentToken.next(token);
  }

  destroyToken() {
    window.localStorage.removeItem('jwtToken');
    this.currentToken.next('');
  }

}
