import { Component, OnInit } from '@angular/core';
import { Weather } from '../models/Weather';
import { WeatherService } from '../services/weather.service';

@Component({
  selector: 'app-environment',
  templateUrl: './environment.component.html',
  styleUrls: ['./environment.component.css']
})
export class EnvironmentComponent implements OnInit {
  outside!: Weather;

  constructor(private weatherService: WeatherService) { }
  ngOnInit(): void {
    this.weatherService.getOutsideWeather().subscribe(weather => {
      console.log(weather);
      this.outside = weather;
    });
  }
}
