import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'home-assistant-web-client';
  constructor(private httpClient: HttpClient) { }
  ngOnInit() {
    this.getWeatherForecast();
  }

  private getWeatherForecast() {
    this.httpClient.get('https://nam-home-assistant.herokuapp.com/weatherforecast').subscribe(data => {
      console.log(data);
    });
  }
}
