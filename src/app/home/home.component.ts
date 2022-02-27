import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../shared/models/user';
import { AccountService } from '../shared/services/account.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  currentUser: User | undefined;
  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
    this.accountService.currentUser.subscribe({
      next: (user: User) => {
        this.currentUser = user;
      }
    });
  }

}
