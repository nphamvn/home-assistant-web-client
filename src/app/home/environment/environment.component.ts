import { Component, OnInit } from '@angular/core';
import { InsideTemperature } from '../models/InsideTemperature';
import { Weather } from '../models/Weather';
import { WeatherService } from '../services/weather.service';

@Component({
  selector: 'app-environment',
  templateUrl: './environment.component.html',
  styleUrls: ['./environment.component.css']
})
export class EnvironmentComponent implements OnInit {
  outside!: Weather;
  inside!: InsideTemperature;

  constructor(private weatherService: WeatherService) { }
  ngOnInit(): void {
    this.weatherService.getOutsideWeather().subscribe(weather => {
      console.log(weather);
      this.outside = weather;
    });

    this.weatherService.getInsideWeather().subscribe(temp => {
      this.inside = temp;
    });
  }
}
