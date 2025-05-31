import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { authGuard } from "../../core/guards/auth.guard";
import { WeeklyPetSalesComponent } from "./weekly-pet-sales/weekly-pet-sales.component";
import { DailyPetSalesComponent } from "./daily-pet-sales/daily-pet-sales.component";

 const routes: Routes = [
     { path: '', component: WeeklyPetSalesComponent,  canActivate:[authGuard] }, 

     { path: 'weekly-sales', component: WeeklyPetSalesComponent , canActivate:[authGuard]}, 
     { path: 'daily-sales', component: DailyPetSalesComponent,  canActivate:[authGuard] }, 
  
   ];
   @NgModule({
     imports: [RouterModule.forChild(routes)],
     exports: [RouterModule]
   })
   export class PetSalesStatisticsRoutingModule { }