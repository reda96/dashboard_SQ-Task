import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { BehaviorSubject, Subscription, take, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = new BehaviorSubject(false);
  querySub!:Subscription;
  public get isAuthenticated$(){
    return this.isAuthenticated.asObservable();
  }
    constructor(private readonly http: HttpClient,
      private router:Router,
      private route:ActivatedRoute
    ) {}



    login(username:string, password:string){
      return this.http.post('https://www.melivecode.com/api/login', {  username, password})
      .pipe(tap((res:any) => {
        sessionStorage.setItem('accessToken', res.accessToken);
        this.isAuthenticated.next(true);
          this.route.queryParams.pipe(take(1)).subscribe((res:any)=> {
              console.log(res);
              
               if(!res.returnUrl)
                 this.router.navigateByUrl('attractions');
                 else this.router.navigate([res.returnUrl]);
          })
       }));
      
      
    }

    
}
