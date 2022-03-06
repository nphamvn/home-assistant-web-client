import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InternalServerErrorComponent } from './components/internal-server-error/internal-server-error.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '404', component: PageNotFoundComponent },
  { path: '500', component: InternalServerErrorComponent },
  //{ path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ErrorsRoutingModule { }
