import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ProfileComponent } from './profile/profile.component';
import { AccountComponent } from './account/account.component';


@NgModule({
  declarations: [
    HomeComponent,
    ProfileComponent,
    AccountComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SettingsRoutingModule,
    RouterModule,
    ReactiveFormsModule
  ],
  exports: []
})
export class SettingsModule { }
