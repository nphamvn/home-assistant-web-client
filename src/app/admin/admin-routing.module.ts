import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../shared/guards/auth.guard';
import { AdminComponent } from './admin/admin.component';

const routes: Routes = [
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard], data: { role: ['Admin'] } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
