import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/shared/services/api.service';
import { Profile } from '../profile';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  form: any = {
    username: '',
    email: '',
    firstName: '',
    lastName: '',
    password: '',
  };
  constructor(private apiService: ApiService) { }
  photoUrl!: string;

  ngOnInit(): void {
    this.getProfile();
  }
  save() {
    console.log(this.form);
    this.apiService.post('/account/profile', this.form).subscribe(data => {
      console.log(data);
    });
  }
  getProfile() {
    this.apiService.get('/account/profile').subscribe(data => {
      if (data) {
        this.form = data;
        this.photoUrl = data.photoUrl;
        console.log('photoUrl: ' + data.photoUrl);
      }
    });
  }

  uploadPhoto(pictures: File[]) {

  }
}
