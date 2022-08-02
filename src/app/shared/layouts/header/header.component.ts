import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
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
  @ViewChild('toggleButton') toggleButton!: ElementRef;
  constructor(private accountService: AccountService, private router: Router) {
  }
  @HostListener('window:click', ['$event'])
  documentClick(event: Event) {
    if (event.target != this.toggleButton.nativeElement) {
      this.dropdownStatus = "hide-dropdown";
    }
  }
  ngOnInit(): void {
    this.currentUser = this.accountService.currentUser;
    this.accountService.isAuthenticated.subscribe(val => {
      this.isLoggedIn = val;
    });
  }
  dropdownStatus = "hide-dropdown";
  displayDropdown(): void {
    this.dropdownStatus = "display-dropdown";
  }
  logout() {
    this.accountService.purgeAuth().subscribe({ complete: () => this.router.navigateByUrl('login') });
  }
}
