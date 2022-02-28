import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatModule } from './chat/chat.module';
import { HealthComponent } from './health/health.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './shared/guards/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'health', component: HealthComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), ChatModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
