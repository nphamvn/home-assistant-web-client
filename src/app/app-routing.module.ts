import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminModule } from './admin/admin.module';
import { ChatModule } from './chat/chat.module';
import { ErrorsModule } from './errors/errors.module';
import { HomeModule } from './home/home.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SettingsModule } from './settings/settings.module';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: '404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), HomeModule, ChatModule, SettingsModule, AdminModule, ErrorsModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
