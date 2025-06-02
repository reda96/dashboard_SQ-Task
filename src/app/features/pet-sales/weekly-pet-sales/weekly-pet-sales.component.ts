import { Component, inject, OnInit } from '@angular/core';

import { ChartDataset, ChartOptions } from 'chart.js';
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
} from 'chart.js';
import { PetSalesStatisticsService } from '../../../core/services/pet-sales-statistics.service';
import { Observable } from 'rxjs';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-weekly-pet-sales',
  standalone: false,
  templateUrl: './weekly-pet-sales.component.html',
  styleUrl: './weekly-pet-sales.component.scss',
})
export class WeeklyPetSalesComponent implements OnInit {
  links = [
    { label: 'Weekly Statistics', link: '/pet-sales/weekly-sales' },
    { label: 'Daily Sales', link: '/pet-sales/daily-sales' },
  ];
  activeLink = this.links[0].link;
  salesService = inject(PetSalesStatisticsService);
  lineChartData = this.salesService.weeklySales$;
  public categories = this.salesService.categories$;

  public lineChartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
        labels: {
          font: {
            size: 40,
          },
        },
      },
      title: {
        display: true,
        text: ' Weekly Values',
      },
    },
  };
  constructor(private datePipe: DatePipe) {
    Chart.register(
      LineController,
      LineElement,
      PointElement,
      LinearScale,
      Title,
      CategoryScale
    );
  }
  ngOnInit(): void {
   
  }
  onDateChange(event:any){
     const formattedDate = this.datePipe.transform(event.value, 'yyyy-MM-dd');
         // Use formattedDate as needed
    console.log(event,formattedDate);
     this.salesService.getWeeklySales(formattedDate||'');

    
  }
}
