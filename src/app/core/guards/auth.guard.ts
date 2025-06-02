import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
      let authService = inject(AuthService);
      let router = inject(Router);
     
  return authService.isAuthenticated$.pipe(
           map((isAuthenticated:boolean) => {
             if (!isAuthenticated) {
               router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
               return false;
             }
             return true;
           }));
};
