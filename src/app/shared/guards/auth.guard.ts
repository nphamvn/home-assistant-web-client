import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable, of, take } from 'rxjs';
import { AccountService } from '../services/account.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private accountService: AccountService) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.accountService.isAuthenticated.pipe(take(1),
      map((isAuthenticated: boolean) => {
        if (route.data['role']) {
          console.log('Required role: ' + route.data['role']);
          if (isAuthenticated && this.accountService.hasRole(route.data['role'].toString())) {
            //this.router.navigateByUrl('404');
            return true;
          }
          else {
            this.router.navigateByUrl('404');
          }
        }
        else {
          if (!isAuthenticated) {
            this.router.navigateByUrl('login');
          }
        }
        return isAuthenticated;
      }));
  }
}
