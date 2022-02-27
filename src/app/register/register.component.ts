import { Component, OnInit } from '@angular/core';
import { AccountService } from '../shared/services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: any = {
    username: '',
    email: '',
    firstName: '',
    lastName: '',
    password: ''
  };
  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
  }
  register() {
    const form = this.form;
    console.log(form);
    this.accountService.register(form).subscribe({
      next: data => {

      },
      error: error => {

      },
      complete: () => { }
    })
  }
}
