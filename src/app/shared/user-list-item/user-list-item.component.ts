import { Component, Input } from '@angular/core';
import { User } from '../../core/models/user.model';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faTrashCan, faEdit
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-user-list-item',
  imports: [FontAwesomeModule],
  templateUrl: './user-list-item.component.html',
  styleUrl: './user-list-item.component.scss',
  standalone:true
})
export class UserListItemComponent {
  @Input() user :User|null= null;
  editIcon = faEdit;
  deleteIcon=faTrashCan;
}
