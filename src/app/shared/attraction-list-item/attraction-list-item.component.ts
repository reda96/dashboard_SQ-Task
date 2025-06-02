import { ChangeDetectionStrategy, Component, inject, Input, OnDestroy } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Attraction } from '../../core/models/attraction.model';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { AttractionManagementService } from '../../core/services/attraction-management.service';

@Component({
  selector: 'app-attraction-list-item',
  imports: [MatCardModule, MatButtonModule,RouterModule,CommonModule],
  templateUrl: './attraction-list-item.component.html',
  styleUrl: './attraction-list-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AttractionListItemComponent implements OnDestroy {
  authService = inject(AuthService);
  attractionService = inject(AttractionManagementService);
  isAuthenticated$ = this.authService.isAuthenticated$;
  @Input() attraction: Attraction | null = null;
  @Input() currentSortCriteria: string | null = '';
  @Input() currentSortType: string | null = '';
  @Input() pageIndex: number | null = 1;
  @Input() pageSize: number | null = 10;
  deleteSub!:Subscription;

   deleteAttraction(id:number | undefined){
     
     this.deleteSub=  this.attractionService.deleteAttraction(id || 0).
    subscribe(()=>{
     console.log("in");
      
      this.attractionService.sortAttractionsBy(this.currentSortType||'',this.currentSortCriteria||'',this.pageIndex||1,this.pageSize||10)
    });
   }
    ngOnDestroy(): void {
    this.deleteSub?.unsubscribe();
  }
}
