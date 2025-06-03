import {
  HttpEvent,
  HttpHandler,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize, Observable, tap } from 'rxjs';
import { LoadingSpinnerService } from '../services/loading-spinner.service';

  export const loadingInterceptor: HttpInterceptorFn = (
    req: HttpRequest<any>,
    next: HttpHandlerFn
  ): Observable<HttpEvent<any>> => {
      let  loadingService = inject(LoadingSpinnerService);
      loadingService.show();
      console.log(req);
      
        return next(req).pipe(
          tap((res:any)=>{console.log(res);}),
          finalize(() => {
          
            
            loadingService.hide();
          }))
  };
