import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ListAttractionsComponent } from "./list-attractions/list-attractions.component";
import { AddEditAttrationsComponent } from "./add-edit-attrations/add-edit-attrations.component";
import { authGuard } from "../../core/guards/auth.guard";

 const routes: Routes = [
     { path: '', component: ListAttractionsComponent }, // Default route
     { path: 'create', component: AddEditAttrationsComponent , canActivate:[authGuard]}, 
     { path: 'update/:id', component: AddEditAttrationsComponent,  canActivate:[authGuard] }, 
  
   ];
   @NgModule({
     imports: [RouterModule.forRoot(routes)],
     exports: [RouterModule]
   })
   export class AttractionsRoutingModule { }