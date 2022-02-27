import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../../models/user';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user: User | undefined
  currentUser: Observable<User> | undefined;
  isLoggedIn = false;
  constructor(private accountService: AccountService, private router: Router) { }

  ngOnInit(): void {
    this.currentUser = this.accountService.currentUser;
    this.accountService.isAuthenticated.subscribe(val => {
      this.isLoggedIn = val;
    });
  }
  logout() {
    this.accountService.purgeAuth().subscribe({ complete: () => this.router.navigateByUrl('login') });
  }
}
