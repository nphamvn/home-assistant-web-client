import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InternalServerErrorComponent } from './pages/internal-server-error/internal-server-error.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';



@NgModule({
  declarations: [
    InternalServerErrorComponent,
    PageNotFoundComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
