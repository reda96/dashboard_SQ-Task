import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { ActivatedRoute, NavigationEnd, Router, RouterModule, UrlSegment } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
@Component({
  selector: 'app-header',
  imports: [MatTabsModule, MatButtonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  standalone: true,
})
export class HeaderComponent implements OnInit {
  links:any[] = [];
   activeLink = '';
  constructor(private authService: AuthService,private router:Router) {}
  ngOnInit(): void {
    
    this.authService.isAuthenticated$.subscribe((isAuthenticated) => {
      if (isAuthenticated) {
    // console.log(this.route.snapshot);

        this.links = [    { label: 'Users', link: '/users' },
    { label: 'Attractions', link: '/attractions' },
    { label: 'Pet Sales Statistics', link: '/pet-sales' },];
  
      } else {
        this.links=[ { label: 'Login', link: '/login' },
    { label: 'Attractions', link: '/attractions' },]

  }
     this. router.events.subscribe((event: any)=>{
       if (event instanceof NavigationEnd) 
        this.activeLink = event.url;
     // console.log(event);
    })
    });
  }

 
}
