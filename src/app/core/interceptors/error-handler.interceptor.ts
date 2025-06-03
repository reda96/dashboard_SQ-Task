import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { ErrorMessageService } from '../services/error-message.service';

export const errorHandlerInterceptor: HttpInterceptorFn = (
   req: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> => {
  let errorService=inject(ErrorMessageService);
  return    next(req).pipe(
      catchError((error: HttpErrorResponse) => {
        // Handle the error here
        console.error('An error occurred:', error.error.message);
        errorService.show(error.error.message)
        // You can display a user-friendly message, log the error, etc.
        return throwError(() => error); // Re-throw the error for further handling
      })
    );

};
