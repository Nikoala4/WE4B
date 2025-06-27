import { CommonModule } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Account } from '../../../../nooble/api-objs/Account';
import { RouterLink } from '@angular/router';
import { RoleTranscriberPipe } from '../../../pipes/role-transcriber.pipe';

@Component({
  selector: 'app-account-information',
  imports: [
    CommonModule,
    RoleTranscriberPipe,
  ],
  templateUrl: './account-information.component.html',
  styleUrl: './account-information.component.css'
})
export class AccountInformationComponent {

  accountData: Account|null = null;

  constructor(private authService: AuthService) {}

  ngOnInit()
  {
    this.accountData = this.authService.currentUser
  }

  logout()
  {
    this.authService.logout();
  }

}
