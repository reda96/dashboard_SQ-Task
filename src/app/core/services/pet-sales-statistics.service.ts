import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PetSalesStatisticsService {
    private weeklySalesSubject = new BehaviorSubject<any[]>([]);
    private categories = new BehaviorSubject<any[]>([]);
    private dailySales = new BehaviorSubject<any[]>([]);
  
    public get weeklySales$() {
      return this.weeklySalesSubject.asObservable();
    }
      public get categories$() {
      return this.categories.asObservable();
    }
      public get dailySales$() {
      return this.dailySales.asObservable();
    }

  constructor(private readonly http: HttpClient
  ) {}
   

  getWeeklySales(date:string){
    this.http.get(`https://www.melivecode.com/api/pets/7days/${date}`)
    .subscribe((res:any) => {
        this.categories.next(res.categories);
        this.weeklySalesSubject.next(res.series);

    })

  }
    getDailySales(date:string){
    this.http.get(`https://www.melivecode.com/api/pets/${date}`)
    .subscribe((res:any) => {
        this.dailySales.next(res);
    })

  }
}
