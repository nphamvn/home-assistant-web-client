import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { ErrorHandlerService } from '../../errors/services/error-handler.service';

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {

  constructor(private errorHandler: ErrorHandlerService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError(error => {
        if (error instanceof HttpErrorResponse) {
          if (error instanceof ErrorEvent) {
            console.error("Error Event");
          } else {
            console.log(`error status : ${error.status} ${error.statusText}`);
            this.errorHandler.handleError(error);
          }
        } else {
          console.error("some thing else happened");
        }
        return throwError(() => new Error(error.messages));
      })
    );
  }
}
