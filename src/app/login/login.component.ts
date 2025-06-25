import { NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  })

  constructor(private api: AuthService) {}

  async submit()
  {
    console.log("submitting")

    this.api.login(this.email, this.password).subscribe({
      next: (response) => {
        console.log("Login successful", response);
      },
      error: (error) => {
        console.error("Login failed", error);
      }
    });
  }

  forgot()
  {
    //TODO: Implement forgot password functionality
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
