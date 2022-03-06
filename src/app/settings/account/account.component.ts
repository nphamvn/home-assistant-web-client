import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AccountService } from 'src/app/shared/services/account.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  form = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  }
  changePasswordForm = this.formBuilder.group({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })
  constructor(private accountService: AccountService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }
  onSubmit() {
    console.log('Change password:' + JSON.stringify(this.changePasswordForm.value));
    this.accountService.changePassword(this.changePasswordForm.value).subscribe(result => {
    });
  }
}
