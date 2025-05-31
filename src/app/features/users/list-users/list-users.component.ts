import { Component } from '@angular/core';
import { UserListItemComponent } from '../../../shared/user-list-item/user-list-item.component';

@Component({
  selector: 'app-list-users',
  imports: [UserListItemComponent],
  templateUrl: './list-users.component.html',
  styleUrl: './list-users.component.scss'
})
export class ListUsersComponent {

}
