import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AttractionsRoutingModule } from './attractions-routing.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatButtonModule } from '@angular/material/button';
import { ListAttractionsComponent } from './list-attractions/list-attractions.component';
import { AddEditAttrationsComponent } from './add-edit-attrations/add-edit-attrations.component';
import { AttractionListItemComponent } from '../../shared/attraction-list-item/attraction-list-item.component';
import {MatSelectModule} from '@angular/material/select';
@NgModule({
  declarations: [ListAttractionsComponent, AddEditAttrationsComponent],
  imports: [
    CommonModule,
    AttractionsRoutingModule,
    AttractionListItemComponent,
    MatPaginatorModule,
    FormsModule,
    MatSelectModule,
    ReactiveFormsModule,  
    MatFormFieldModule,
    MatInputModule,
    FontAwesomeModule,
    MatButtonModule, 
     
  ],
  providers:[ {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'outline'}}]

})
export class AttractionsModule {}
