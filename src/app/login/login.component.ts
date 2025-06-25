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
  resultMessage: string = "";
  resultMessageIsError: boolean = false;

  constructor(private api: AuthService) {}

  async submit()
  {
    this.api.login(this.email, this.password).subscribe({
      next: (response) => {
        this.resultMessage = "Bonjour, " + response.first_name + " " + response.last_name;
        this.resultMessageIsError = false;
      },
      error: (error) => {
        if (error.status === 401) {
          this.resultMessage = "Nom d'utilisateur ou mot de passe incorrect";
        } else {
          this.resultMessage = "Une erreur est survenue";
        }
        this.resultMessageIsError = true;
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
