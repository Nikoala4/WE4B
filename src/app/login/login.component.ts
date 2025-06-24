import { NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { ApiAuthenticationService } from '../services/api-authentication.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule,
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  })

  constructor(private api: ApiAuthenticationService) {}

  async submit()
  {
    console.log("submitting")
    this.api.login(this.email, this.password).subscribe({
      next: (response) => {
        console.log("Login successful", response);
        // Handle successful login, e.g., redirect to home page
      },
      error: (error) => {
        console.error("Login failed", error);
        // Handle login error, e.g., show an error message
      }
    });
  }

  forgot(){
  }

  validateForm(): Boolean{

    return true
  }

  get email(): string 
  {
    return this.form.get('email')?.value as string;
  }

  get password(): string
  {
    return this.form.get('password')?.value as string;
  }

}
