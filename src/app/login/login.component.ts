import { NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule,
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  })

  api = inject(ApiService)

  async submit(){
    console.log("submitting")
    const resp = this.api.login(this.email?.value as String, this.password?.value as String)
    console.log(resp)
  }

  forgot(){
  }

  validateForm(): Boolean{

    return true
  }

  get email(){
    return this.form.get('email')
  }

  get password(){
    return this.form.get('password')
  }


}
