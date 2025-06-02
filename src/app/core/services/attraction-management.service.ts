import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Subject } from 'rxjs';
import { Attraction } from '../models/attraction.model';

@Injectable({
  providedIn: 'root'
})
export class AttractionManagementService {
    private attractionsSubject = new BehaviorSubject<Attraction[]>([]);
    private attractionDetailSubject = new Subject<Attraction>();
    private attractionsLength = new BehaviorSubject<number>(0);
  
    public get attractions$() {
      return this.attractionsSubject.asObservable();
    }
      public get attractionById$() {
      return this.attractionDetailSubject.asObservable();
    }
    public get attractionsLength$() {
      return this.attractionsLength.asObservable();
    }
  constructor(private http:HttpClient) { }


     getAttractionById(id:number) {
    
      this.http
        .get(
          `https://www.melivecode.com/api/th/attractions/${id}`
        )
        .pipe(
          map((res: any) => {
          
  
            return res.attraction;
          })
        )
        .subscribe((data) => {
          console.log(data);
  
          this.attractionDetailSubject.next(data);
        });
    }
   getAttractions(page: number = 1, per_page: number = 12) {
    
      this.http
        .get(
          `https://www.melivecode.com/api/attractions?page=${page}&per_page=${per_page}`
        )
        .pipe(
          map((res: any) => {
            this.attractionsLength.next(res.total);
  
            return res.data;
          })
        )
        .subscribe((data) => {
          console.log(data);
  
          this.attractionsSubject.next(data);
        });
    }

   sortAttractionsBy(sort_order:string,sort_column:string, page: number = 1, per_page: number = 12) {


        this.http
      .get(
        `https://www.melivecode.com/api/attractions?page=${page}&per_page=${per_page}&sort_column=${sort_column}&sort_order=${sort_order}`
      )
      .pipe(
        map((res: any) => {
          this.attractionsLength.next(res.total);

          return res.data;
        })
      )
      .subscribe((data) => {

        this.attractionsSubject.next(data);
      });
  }

  createAttraction(attraction:Attraction){

  }
    updateAttraction(attraction:Attraction){

  }
}
