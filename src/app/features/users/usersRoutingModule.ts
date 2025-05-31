import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { authGuard } from "../../core/guards/auth.guard";
import { ListUsersComponent } from "./list-users/list-users.component";
import { AddEditUserComponent } from "./add-edit-user/add-edit-user.component";

 const routes: Routes = [
     { path: '', component: ListUsersComponent, canActivate:[authGuard] }, // Default route
     { path: 'create', component: AddEditUserComponent , canActivate:[authGuard]}, 
     { path: 'update/:id', component: AddEditUserComponent,  canActivate:[authGuard] }, 
  
   ];
   @NgModule({
     imports: [RouterModule.forRoot(routes)],
     exports: [RouterModule]
   })
   export class AttractionsRoutingModule { }