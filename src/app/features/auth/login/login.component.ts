import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faL } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  standalone:false
})
 export class LoginComponent {
  authService = inject(AuthService);
     loginForm = new FormGroup({
       username: new FormControl('', [Validators.required]),
       password: new FormControl('', Validators.required)
     });

     onSubmit() {
       if (this.loginForm.valid) {
         // Handle form submission
         console.log(this.loginForm.value);
         this.authService.login(this.loginForm.value.username ||'', this.loginForm.value.password||'')
         .subscribe();
         
       } else {
        this.loginForm.reset();
        this.loginForm.markAllAsTouched();}
     }
   }