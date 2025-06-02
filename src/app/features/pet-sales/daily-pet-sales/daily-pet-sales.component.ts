import { DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { PetSalesStatisticsService } from '../../../core/services/pet-sales-statistics.service';

@Component({
  selector: 'app-daily-pet-sales',
  standalone:false,
  templateUrl: './daily-pet-sales.component.html',
  styleUrl: './daily-pet-sales.component.scss'
})
export class DailyPetSalesComponent {
 links = [
    { label: 'Weekly Statistics', link: '/pet-sales/weekly-sales' },
    { label: 'Daily Sales', link: '/pet-sales/daily-sales' },
  ];
  activeLink = this.links[1].link;
    salesService = inject(PetSalesStatisticsService);
     dailySales = this.salesService.dailySales$;
  constructor(private datePipe: DatePipe) {

  }

    onDateChange(event:any){
     const formattedDate = this.datePipe.transform(event.value, 'yyyy-MM-dd');
         // Use formattedDate as needed
    console.log(event,formattedDate);
     this.salesService.getDailySales(formattedDate||'');

    
  }
}
 