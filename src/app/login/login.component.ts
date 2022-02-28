import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../shared/services/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: any = {
    username: 'admin',
    password: 'P@ssw0rd'
  };
  isSubmitting = false;
  errorMessage = '';
  constructor(private accountService: AccountService, private router: Router) { }

  ngOnInit(): void {
  }
  login() {
    const { username, password } = this.form;
    this.accountService.logIn({ username: username, password: password }).subscribe({
      next: data => {
        console.log(data);
        this.router.navigateByUrl('');
      },
      complete: () => {
        this.isSubmitting = true;
      },
      error: (error) => {
      }
    })
  }
}
