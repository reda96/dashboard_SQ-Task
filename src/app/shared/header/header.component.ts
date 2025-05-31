import { Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatTabsModule} from '@angular/material/tabs';
@Component({
  selector: 'app-header',
  imports: [MatTabsModule, MatButtonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  standalone:true
})
export class HeaderComponent {
    links = ['First', 'Second', 'Third'];
  activeLink = this.links[0];

}
