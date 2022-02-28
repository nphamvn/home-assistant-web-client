import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable, of, take } from 'rxjs';
import { AccountService } from '../services/account.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private accountService: AccountService) { }
  canActivate(): Observable<boolean> {
    return this.accountService.isAuthenticated.pipe(take(1),
      map((isAuthenticated: boolean) => {
        if (!isAuthenticated) {
          this.router.navigateByUrl('login');
        }
        return isAuthenticated;
      }));
  }
}
