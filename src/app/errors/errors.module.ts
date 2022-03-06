import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ErrorsRoutingModule } from './errors-routing.module';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { InternalServerErrorComponent } from './components/internal-server-error/internal-server-error.component';


@NgModule({
  declarations: [
    PageNotFoundComponent,
    InternalServerErrorComponent
  ],
  imports: [
    CommonModule,
    ErrorsRoutingModule
  ]
})
export class ErrorsModule { }
