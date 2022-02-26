import { Component, Input, OnInit } from '@angular/core';
import { WeatherForecast } from '../WeatherForecast';

@Component({
  selector: 'app-weatherforecast',
  templateUrl: './weatherforecast.component.html',
  styleUrls: ['./weatherforecast.component.css']
})
export class WeatherforecastComponent implements OnInit {
  @Input() weatherForecast?: WeatherForecast;
  constructor() { }

  ngOnInit(): void {
  }

}
