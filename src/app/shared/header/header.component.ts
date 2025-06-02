import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { ActivatedRoute, NavigationEnd, Router, RouterModule, UrlSegment } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { Observable, Subscription } from 'rxjs';
import { User } from '../../core/models/user.model';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-header',
  imports: [MatTabsModule, MatButtonModule, RouterModule,CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  standalone: true,
})
export class HeaderComponent implements OnInit,OnDestroy {

  links:any[] = [];
   activeLink = '';
   authService=inject(AuthService);
   router=inject(Router);
    currentUser:Observable<User|null> =this.authService.currentUser$;
    isAuthenticated=false;
  routeSub!:Subscription;
  authSub!:Subscription;
  ngOnInit(): void {
  this.authSub=  this.authService.isAuthenticated$.subscribe((isAuthenticated) => {
      if (isAuthenticated) {
        this.isAuthenticated =true;
    // console.log(this.route.snapshot);

        this.links = [    { label: 'Users', link: '/users' },
    { label: 'Attractions', link: '/attractions' },
    { label: 'Pet Sales Statistics', link: '/pet-sales' },];
  
      } else {
        this.links=[ { label: 'Login', link: '/login' },
    { label: 'Attractions', link: '/attractions' },]

  }
 this.routeSub=    this. router.events.subscribe((event: any)=>{
       if (event instanceof NavigationEnd) 
        this.activeLink = event.url;
     // console.log(event);
    })
    });
  }
  ngOnDestroy(): void {
   this.authSub?.unsubscribe();
   this.routeSub?.unsubscribe();
  }
 
}
