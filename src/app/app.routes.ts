import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { LoginComponent } from './features/auth/login/login.component';

export const routes: Routes = [
      {
    path: 'users',
    loadChildren: () => import('./features/users/users.module').then(m => m.UsersModule),
    canActivate:[authGuard]
    },
       {
    path: 'attractions',
    loadChildren: () => import('./features/attractions/attractions.module').then(m => m.AttractionsModule)
    },
        {
    path: 'pet-sales',
    loadChildren: () => import('./features/pet-sales/pet-sales.module').then(m => m.PetSalesModule)
    },
         {
    path: 'login',
        loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule)
    }
    

];
