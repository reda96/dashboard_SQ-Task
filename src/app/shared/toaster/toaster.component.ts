import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
 faClose,
 
} from '@fortawesome/free-solid-svg-icons';
import { ErrorMessageService } from '../../core/services/error-message.service';
@Component({
  selector: 'app-toaster',
  imports: [FontAwesomeModule,CommonModule],
  templateUrl: './toaster.component.html',
  styleUrl: './toaster.component.scss'
})
export class ToasterComponent implements OnInit{
errorService = inject(ErrorMessageService);
errorMessag$ = this.errorService.errorMessage$;
message='';
faClose=faClose;
clas='';
ngOnInit(): void {
this.errorMessag$.subscribe(res=>{
  this.message=res;
})
}

}
