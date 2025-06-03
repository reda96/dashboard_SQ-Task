import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/header/header.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { LoadingSpinnerService } from './core/services/loading-spinner.service';
import { CommonModule } from '@angular/common';
import { ToasterComponent } from './shared/toaster/toaster.component';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet,HeaderComponent,MatProgressSpinnerModule, CommonModule,ToasterComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    changeDetection:ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  title = 'DashboardApplication';
  loadingService = inject(LoadingSpinnerService);
  loadingObs = this.loadingService.loading$;

  
  
}
