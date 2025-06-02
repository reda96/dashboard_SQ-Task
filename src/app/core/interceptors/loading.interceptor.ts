import {
  HttpEvent,
  HttpHandler,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize, Observable } from 'rxjs';
import { LoadingSpinnerService } from '../services/loading-spinner.service';

  export const loadingInterceptor: HttpInterceptorFn = (
    req: HttpRequest<any>,
    next: HttpHandlerFn
  ): Observable<HttpEvent<any>> => {
      let  loadingService = inject(LoadingSpinnerService);
      loadingService.show();
        return next(req).pipe(
          finalize(() => {
          
            
            loadingService.hide();
          }))
  };
