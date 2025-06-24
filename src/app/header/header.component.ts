import { Component, Inject, PLATFORM_ID, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Role } from '../../nooble/api-objs/Role';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { Account } from '../../nooble/api-objs/Account';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FormsModule, RouterLink, CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  currentUser: Account | null = null;
  currentUserImage: string = '';
  adminEnabled = false;

  constructor(private authService: AuthService, @Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    this.currentUserImage = this.authService.getUserImage();

    if (isPlatformBrowser(this.platformId))
    {
      this.adminEnabled = this.getCookie('admin_enabled') === 'true';
    }
  }

  get isAdmin(): boolean {
    return (this.currentUser?.role == Role.ADMIN || this.currentUser?.role == Role.TEACHER_ADMIN) ?? false;
  }

  get isTeacher(): boolean {
    return (this.currentUser?.role == Role.TEACHER || this.currentUser?.role == Role.TEACHER_ADMIN) ?? false;
  }

  onAdminSwitchChange(): void {
    this.setCookie('admin_enabled', this.adminEnabled.toString(), 7);
  }

  private getCookie(name: string): string | null {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? match[2] : null;
  }

  private setCookie(name: string, value: string, days: number): void {
    const expires = new Date(Date.now() + days * 86400000).toUTCString();
    document.cookie = `${name}=${value}; expires=${expires}; path=/`;
  }
}
