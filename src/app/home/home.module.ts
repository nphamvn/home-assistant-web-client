import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { EnvironmentComponent } from './environment/environment.component';
import { HomeComponent } from './home/home.component';
import { LightComponent } from './light/light.component';
import { CameraComponent } from './camera/camera.component';
import { AirconComponent } from './aircon/aircon.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [
    EnvironmentComponent,
    HomeComponent,
    LightComponent,
    CameraComponent,
    AirconComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FontAwesomeModule
  ]
})
export class HomeModule { }
