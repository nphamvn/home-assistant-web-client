import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatModule } from './chat/chat.module';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SettingsModule } from './settings/settings.module';
import { AuthGuard } from './shared/guards/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), ChatModule, SettingsModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
