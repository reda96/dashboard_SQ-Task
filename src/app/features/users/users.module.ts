import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersRoutingModule } from './usersRoutingModule';
import { UserListItemComponent } from '../../shared/user-list-item/user-list-item.component';
import { ListUsersComponent } from './list-users/list-users.component';
import { AddEditUserComponent } from './add-edit-user/add-edit-user.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule } from '@angular/material/form-field';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
@NgModule({
  declarations: [ListUsersComponent, AddEditUserComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    UserListItemComponent,
    MatPaginatorModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    FontAwesomeModule
  ],
  providers:[ {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'outline'}}]
})
export class UsersModule {}
