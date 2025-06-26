import { NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule,
    ReactiveFormsModule,
    NgIf,
    RouterLink
  ],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email])
  })

  forgotPasswordLaunched: boolean = false;
  forgotPasswordFinished:boolean = false;
  resultMessage:string = "";
  resultMessageIsError: boolean = false;

  constructor(private api: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.forgotPasswordLaunched = false;
    this.resultMessage = "";
    this.resultMessageIsError = false;
  }

  async submit()
  {
    this.forgotPasswordLaunched = true;
    this.forgotPasswordFinished = false;

    this.resultMessage = "";
    this.resultMessageIsError = false;

    this.api.launchForgotPasswordProcess(this.email).subscribe({
      next: (response) => {
        this.forgotPasswordFinished = true;
        this.resultMessage = "Bonjour, " + response.first_name + " " + response.last_name + ", un mail contenant votre nouveau mot de passe vous a été envoyé.";
        this.resultMessageIsError = false;

      },
      error: (error) => {
        this.forgotPasswordFinished = false;
        this.forgotPasswordLaunched = false;

        this.resultMessage = "Votre compte n'a pas pu être trouvé. Veuillez vérifier l'adresse e-mail saisie.";
        this.resultMessageIsError = true;

      }
    });
  }

  backToLogin()
  {
    this.router.navigate(['/login']);
  }

  validateForm(): Boolean{
    return true
  }

  get email(): string 
  {
    return this.form.get('email')?.value as string;
  }

}
