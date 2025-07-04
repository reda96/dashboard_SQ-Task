import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

    @Injectable({
        providedIn: 'root'
    })
    export class LoadingSpinnerService {
       counter = 0;
        private loadingSubject = new BehaviorSubject<boolean>(false);
        public get  loading$(){
       return  this.loadingSubject.asObservable();
        }
        show() {
         
           console.log('show: ');
              // if(this.counter==0)
              this.loadingSubject.next(true);
              // this.counter++;
               
         
            
        }

        hide() {
          
          //  this.counter--;
          // if(this.counter==0)
         this.loadingSubject.next(false);
        
        console.log('hide: ');
        
        }
    }