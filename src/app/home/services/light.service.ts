import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/shared/services/api.service';
import { Light } from '../models/Light';

@Injectable({
  providedIn: 'root'
})
export class LightService {

  constructor(private apiService: ApiService) { }

  getLightStatus(light: String): Observable<Light> {
    return this.apiService.get('/light?name=' + light);
  }
  turnOnLight(light: String): Observable<Light> {
    return this.apiService.post('/light?name=' + light + '&action=on');
  }

  turnOffLight(light: String): Observable<Light> {
    return this.apiService.post('/light?name=' + light + '&action=off');
  }
  brighten(light: String): Observable<Light> {
    return this.apiService.post('/light?name=' + light + '&action=brighten');
  }
  dim(light: String): Observable<Light> {
    return this.apiService.post('/light?name=' + light + '&action=dim');
  }
}
