import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Attraction } from '../../core/models/attraction.model';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-attraction-list-item',
  imports: [MatCardModule, MatButtonModule,RouterModule,CommonModule],
  templateUrl: './attraction-list-item.component.html',
  styleUrl: './attraction-list-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AttractionListItemComponent {
  authService = inject(AuthService);
  isAuthenticated$ = this.authService.isAuthenticated$;
  @Input() attraction: Attraction | null = null;
  @Input() currentSort: string | null = '';
  @Input() searchWord: string | null = '';
  @Input() pageIndex: number | null = 1;
  @Input() pageSize: number | null = 10;
}
