import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorMessageService {

  constructor() { }
   private messageSubject = new BehaviorSubject<string>('');
        public get  errorMessage$(){
       return  this.messageSubject.asObservable();
        }
     show(message:string) {
         
      
              this.messageSubject.next(message);

               setTimeout(() => {
                this.hide('')
               }, 3000);
         
            
        }

        hide(message:string) {

    
             this.messageSubject.next('');
       
        

        
        }
}
