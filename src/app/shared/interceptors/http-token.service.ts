import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JwtService } from '../services/jwt.service';

@Injectable({
  providedIn: 'root'
})
export class HttpTokenService implements HttpInterceptor {

  constructor(private jwtService: JwtService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log(req.urlWithParams);
    console.log('intercepted request ... ');
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });

    const token = this.jwtService.getToken();
    if (token) {
      console.log('token found ... ' + token);
      req = req.clone({
        setHeaders: { Authorization: `Bearer ${token}` }
      });
    }
    return next.handle(req);
  }
}
