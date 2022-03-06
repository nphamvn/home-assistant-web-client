import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {
  public errorMessage: string = '';
  constructor(private router: Router) { }

  public handleError = (error: HttpErrorResponse) => {
    switch (error.status) {
      case 401: // Unauthorized
        this.router.navigate(['/login']);
        break;
      case 403: // Forbidden
        this.router.navigate(['/login']);
        break;
      case 404: // Not Found
        this.router.navigate(['/404']);
        break;
      case 500: // Internal Server Error
        this.router.navigate(['/500']);
        break;
      default:
        break;
    }
  }
}
