import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { UserManagementService } from '../../../core/services/user-management.service';
import { PageEvent } from '@angular/material/paginator';
import { FormControl } from '@angular/forms';
import { debounceTime, Subscription } from 'rxjs';
import {
  faArrowUpWideShort,
  faArrowDownShortWide,
} from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrl: './list-users.component.scss',
  standalone: false,
})
export class ListUsersComponent implements OnInit, OnDestroy {
  sortDesIcon = faArrowUpWideShort;
  sortAscIcon = faArrowDownShortWide;
  currentSort = '';
  searchInput = '';
  pageSize = 10;
  pageIndex = 1;
  userService = inject(UserManagementService);
  usersObs = this.userService.users$;
  userLength = this.userService.usersLength$;
  searchControl = new FormControl('');
  valueChangesSubscription: Subscription | undefined;

  ngOnInit(): void {
    this.userService.getUsers();

    this.valueChangesSubscription = this.searchControl.valueChanges
      .pipe(debounceTime(1000))
      .subscribe((value) => {
        // console.log('Value changed:', value);
        this.searchInput=value||'';
        this.userService.searchUsers(value || '');
      });
  }

  handlePageEvent(e: PageEvent) {
    // this.pageEvent = e;
    // this.length = e.length;
     this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex +1;
    this.userService.getUsers(e.pageIndex + 1, e.pageSize);
  }

  sortBy(sortCriteria: string, sortType: string) {
    let sortAsc = 'Asc';
    let sortDes = 'Des';
    let currentSort = 'sort' + sortType + 'By' + sortCriteria;

    if (this.currentSort == currentSort)
      if (this.currentSort.includes(sortAsc)) {
        this.currentSort = 'sort' + sortDes + 'By' + sortCriteria;
        this.userService.sortUsersBy(sortDes.toLowerCase(),sortCriteria.toLowerCase(),this.searchInput,this.pageIndex,this.pageSize);
        return;
      } else {
        this.currentSort = 'sort' + sortAsc + 'By' + sortCriteria;
         this.userService.sortUsersBy(sortAsc.toLowerCase(),sortCriteria.toLowerCase(),this.searchInput,this.pageIndex,this.pageSize);
        return;
      }
    this.currentSort = currentSort;
     this.userService.sortUsersBy(sortType.toLowerCase(),sortCriteria.toLowerCase(),this.searchInput,this.pageIndex,this.pageSize);
  }
  ngOnDestroy(): void {
    if (this.valueChangesSubscription) {
      this.valueChangesSubscription.unsubscribe();
    }
  }
}
