import { Component, inject, Input, OnDestroy } from '@angular/core';
import { User } from '../../core/models/user.model';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faTrashCan, faEdit
} from '@fortawesome/free-solid-svg-icons';
import { UserManagementService } from '../../core/services/user-management.service';
import { RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-list-item',
  imports: [FontAwesomeModule,RouterModule],
  templateUrl: './user-list-item.component.html',
  styleUrl: './user-list-item.component.scss',
  standalone:true
})
export class UserListItemComponent implements OnDestroy{
  deleteSub!:Subscription;
  @Input() user :User|null= null; 
  @Input() currentSort :string|null= '';
  @Input() searchWord :string|null= '';
  @Input() pageIndex :number|null= 1;
  @Input() pageSize :number|null= 10;
  userService = inject(UserManagementService);
  editIcon = faEdit;
  deleteIcon=faTrashCan;


   deleteUser(id:number | undefined){
     this.deleteSub=  this.userService.deleteUser(id || 0).
    subscribe(()=>{
      let sortType =this.currentSort?.split('sort')[1].split('By')[0].toLowerCase();
      let sortCriteria =this.currentSort?.split('sort')[1].split('By')[1].toLowerCase();

      this.userService.sortUsersBy(sortType||'',sortCriteria||'',this.searchWord||'',this.pageIndex||1,this.pageSize||10)
    });
   }
    ngOnDestroy(): void {
    this.deleteSub?.unsubscribe();
  }
}
