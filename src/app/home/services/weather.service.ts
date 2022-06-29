import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/shared/services/api.service';
import { Weather } from '../models/Weather';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private apiService: ApiService) { }

  getOutsideWeather(): Observable<Weather> {
    return this.apiService.get("/weather/outside");
  }
}
