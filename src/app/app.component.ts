import { Component, OnInit } from '@angular/core';
import { User } from './shared/models/user';
import { AccountService } from './shared/services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Home Assistant';
  currentUser?: User;
  constructor(private accountService: AccountService) {
  }
  ngOnInit() {
    this.accountService.populate();
  }
}
