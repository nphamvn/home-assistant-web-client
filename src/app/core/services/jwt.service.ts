import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  constructor(private localStorage: LocalStorageService) { }

  getToken(): String {
    //return window.localStorage['jwtToken'];
    return localStorage.getItem('jwtToken') ?? '';
  }

  saveToken(token: String) {
    //window.localStorage['jwtToken'] = token;
    localStorage.setItem('jwtToken', token.toString());
  }

  destroyToken() {
    //window.localStorage.removeItem('jwtToken');
    localStorage.removeItem('jwtToken');
  }
}
