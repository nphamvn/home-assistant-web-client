import { Component, OnInit } from '@angular/core';
import { faMinus, faMoon, faPlus, faPowerOff } from '@fortawesome/free-solid-svg-icons';
import { Light } from '../models/Light';
import { LightService } from '../services/light.service';

@Component({
  selector: 'app-light',
  templateUrl: './light.component.html',
  styleUrls: ['./light.component.css']
})
export class LightComponent implements OnInit {
  MAX_BRIGHTNESS: number = 10;
  MIN_BRIGHTNESS: number = 1;
  bedroom!: Light;
  //brightness = 1;
  constructor(private lightService: LightService) { }
  faPowerOff = faPowerOff;
  faMoon = faMoon;
  faPlus = faPlus;
  faMinus = faMinus;

  ngOnInit(): void {
    this.lightService.getLightStatus('bedroom').subscribe(light => {
      this.bedroom = light;
    })
  }

  turnOnLight(light: String): void {
    this.lightService.turnOnLight('bedroom').subscribe(light => {
      this.bedroom = light;
    })
  }
  turnOffLight(light: String): void {
    this.lightService.turnOffLight('bedroom').subscribe(light => {
      this.bedroom = light;
    })
  }
  brighten(light: String): void {
    if (this.bedroom?.brightness <= this.MAX_BRIGHTNESS - 1) {
      this.lightService.brighten(light).subscribe(light => {
        console.log(light);
        this.bedroom = light;
      });
    }
  }
  dim(light: String): void {
    if (this.bedroom?.brightness >= this.MIN_BRIGHTNESS + 1) {
      //this.brightness = this.brightness - 1;
      this.lightService.dim(light).subscribe(light => {
        this.bedroom = light;
      });
    }
  }
}
