import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { PetSalesStatisticsRoutingModule } from './pet-sales-routing.module';

import { WeeklyPetSalesComponent } from './weekly-pet-sales/weekly-pet-sales.component';
import { DailyPetSalesComponent } from './daily-pet-sales/daily-pet-sales.component';

import { BaseChartDirective } from 'ng2-charts';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule } from '@angular/router';
@NgModule({
  declarations: [WeeklyPetSalesComponent, DailyPetSalesComponent],
  providers: [provideNativeDateAdapter(),
     {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'outline'}},
     DatePipe
  ],
  
  imports: [
    CommonModule,
    PetSalesStatisticsRoutingModule,
    BaseChartDirective,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatIconModule,
    MatTabsModule,
    RouterModule,
    
  ],
}) 
export class PetSalesModule {}
