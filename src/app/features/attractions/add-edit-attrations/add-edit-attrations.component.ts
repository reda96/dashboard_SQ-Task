import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AttractionManagementService } from '../../../core/services/attraction-management.service';
import { Attraction } from '../../../core/models/attraction.model';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-edit-attrations',
  templateUrl: './add-edit-attrations.component.html',
  styleUrl: './add-edit-attrations.component.scss',
  standalone: false,
})
export class AddEditAttrationsComponent {
  editMode = false;
  attractionService = inject(AttractionManagementService);
  id: any = 0;
  route = inject(ActivatedRoute);
   attractionById$ = this.attractionService.attractionById$;
  imageUrl = '';
  attractionForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    coverimage: new FormControl('', [Validators.required]),
    detail: new FormControl('', [Validators.required]),
    latitude: new FormControl(0, [Validators.required]),
    longitude: new FormControl(0, [Validators.required]),
  });

  routeSub!: Subscription;
  attractionByIdSub!: Subscription;
  ngOnInit(): void {
    this.routeSub = this.route.paramMap.subscribe((params) => {
      this.id = params.get('id');
      this.editMode = true;
      //  console.log('Route ID:', id);
      if (this.id) this.attractionService.getAttractionById(+this.id);
    });

    this.attractionByIdSub = this.attractionById$.subscribe((attraction: Attraction) => {
      this.attractionForm.patchValue({
        ...attraction,
      });
    });
  }

  useImage(event: any) {
    console.log(event.target.value);
    this.imageUrl = event.target.value;
  }

  onSubmit() {
    if (this.attractionForm.valid) {
      // Handle form submission
      console.log(this.attractionForm.value);
      let attraction = this.attractionForm.value as Attraction;
      if (!this.editMode) this.attractionService.createAttraction(attraction);
      else
        this.attractionService.updateAttraction({ ...attraction, id: this.id });
    } else {
      this.attractionForm.reset();
      this.attractionForm.markAllAsTouched();
    }
  }
  ngOnDestroy(): void {
    this.routeSub?.unsubscribe();
    this.attractionByIdSub?.unsubscribe();
  }
}
