import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserManagementService } from '../../../core/services/user-management.service';
import { User } from '../../../core/models/user.model';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-edit-user',
  templateUrl: './add-edit-user.component.html',
  styleUrl: './add-edit-user.component.scss',
  standalone: false,
})
export class AddEditUserComponent implements OnInit , OnDestroy{

  editMode = false;
  usersService = inject(UserManagementService);
  id: any = 0;
  route = inject(ActivatedRoute);
  userById$ = this.usersService.userById$;
  imageUrl = '';
  userForm = new FormGroup({
    fname: new FormControl('', [Validators.required]),
    lname: new FormControl('', [Validators.required]),
    avatar: new FormControl('', [Validators.required]),
    username: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });
  routeSub!:Subscription;
  userByIdSub!:Subscription;
  ngOnInit(): void {
   this.routeSub= this.route.paramMap.subscribe((params) => {
      this.id = params.get('id');
      
      //  console.log('Route ID:', id);
      if (this.id){
        this.editMode = true;
        this.usersService.getUserById(+this.id);}
    });

  this.userByIdSub=  this.userById$.subscribe((user: User) => {
      this.userForm.patchValue({
        ...user,
      });
    });
  }
  useImage(event: any) {
    console.log(event.target.value);
    this.imageUrl = event.target.value;
  }

  onSubmit() {
    if (this.userForm.valid) {
      // Handle form submission
      console.log(this.userForm.value);
      let user = this.userForm.value as User;
      if (!this.editMode) this.usersService.createUser(user);
      else this.usersService.updateUser({ ...user, id: this.id });
    } else {
      this.userForm.reset();
      this.userForm.markAllAsTouched();
    }
  }
    ngOnDestroy(): void {

      this.routeSub?.unsubscribe();
      this.userByIdSub?.unsubscribe();
  }
}
