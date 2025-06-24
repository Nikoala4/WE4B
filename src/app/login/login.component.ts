import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: String = ''
  password: String=''

  submit(){
    if (this.validateForm()){
      console.log(this.email + "\n" + this.password)
    }
  }

  forgot(){
    console.log('FORGOT' + this.email)
  }

  validateForm(): Boolean{

    return true
  }
}
