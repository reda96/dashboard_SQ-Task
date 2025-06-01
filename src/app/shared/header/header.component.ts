import { Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatTabsModule} from '@angular/material/tabs';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-header',
  imports: [MatTabsModule, MatButtonModule,RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  standalone:true
})
export class HeaderComponent {
    links = [
      {label:'Login', link:'/login'},
      {label:'Users', link:'/users'},
      {label:'Attractions', link:'/attractions'},
      {label:'Pet Sales Statistics', link:'/pet-sales'}
    ];
  activeLink = this.links[0].link;

}
