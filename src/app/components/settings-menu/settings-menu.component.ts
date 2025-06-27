import { NgIf } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { Router, RouterLink, UrlTree } from '@angular/router';
import { Account } from '../../../nooble/api-objs/Account';
import { AuthService } from '../../services/auth.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-settings-menu',
  imports: [
    NgIf,
    RouterLink
  ],
  templateUrl: './settings-menu.component.html',
  styleUrl: './settings-menu.component.css'
})
export class SettingsMenuComponent {
  user: Account | null = null;

  constructor(
    private authService: AuthService,
    public router: Router
  ) {
    this.user = authService.getCurrentUser();

    authService.authStatusChanged.subscribe({
      next: () => {
        this.user = authService.getCurrentUser();
      }
    })
  };

}
