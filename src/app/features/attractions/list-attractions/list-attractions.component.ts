import { Component, inject, OnInit } from '@angular/core';
import { AttractionManagementService } from '../../../core/services/attraction-management.service';
import {
  faArrowUpWideShort,
  faArrowDownShortWide,
} from '@fortawesome/free-solid-svg-icons';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-list-attractions',
  templateUrl: './list-attractions.component.html',
  styleUrl: './list-attractions.component.scss',
  standalone: false,
})
export class ListAttractionsComponent implements OnInit {
  sortDesIcon = faArrowUpWideShort;
  sortAscIcon = faArrowDownShortWide;
  sortOptions = ['id', 'name', 'detail', 'longitude', 'latitude'];
  searchInput = '';
  pageSize = 12;
  pageIndex = 1;
  currentSortCriteria = '';
  currentSortType = '';
  attractionsService = inject(AttractionManagementService);
  attractionsObs = this.attractionsService.attractions$;
  attractionsLength = this.attractionsService.attractionsLength$;

  ngOnInit(): void {
    this.attractionsService.getAttractions();
  }

  handlePageEvent(e: PageEvent) {
    // this.pageEvent = e;
    // this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex + 1;
    this.attractionsService.getAttractions(e.pageIndex + 1, e.pageSize);
  }
  sortBy(event: any) {
    let sortAsc = 'Asc';
    let sortDes = 'Des';
    let sortCriteria = event.value;
    if(sortCriteria)
    this.currentSortCriteria = sortCriteria;
    
    // let currentSort = 'sort' + sortType + 'By' + sortCriteria;

    if (this.currentSortCriteria == sortCriteria || !sortCriteria)
      if (this.currentSortType == 'DES') 
        this.currentSortType = 'ASC';
      else this.currentSortType = 'DES';
    else this.currentSortType = 'DES';

    this.attractionsService.sortAttractionsBy(
      this.currentSortType.toLowerCase(),
      this.currentSortCriteria.toLowerCase(),
      this.pageIndex,
      this.pageSize
    );

  }
}
