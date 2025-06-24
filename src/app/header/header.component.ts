import { Component, Inject, PLATFORM_ID, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Role } from '../../nooble/api-objs/Role';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { Account } from '../../nooble/api-objs/Account';
import { PathResolverService } from '../services/path-resolver.service';
import { FileType } from '../../nooble/api-objs/FileType';

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

  constructor(private authService: AuthService, @Inject(PLATFORM_ID) private platformId: Object, private pathResolver: PathResolverService) {}

  reload(): void {
    if (this.authService.isLoggedIn()) {
      this.currentUser = this.authService.getCurrentUser()!;

      if (this.currentUser.profile.profile_image !== null) {
        this.currentUserImage = this.pathResolver.getResourcePath(this.currentUser.profile.profile_image, FileType.PROFILE_ICON);
      } else {
        this.currentUserImage = "/images/icons/user.png";
      }

    } else {
      this.currentUser = null;
      this.currentUserImage = "/images/icons/user.png";
    }
  }

  ngOnInit(): void {
    // S'abonner à l'observable du service AuthService pour écouter les changements d'utilisateur
    this.authService.authStatusChanged.subscribe(authState => {
      this.reload();
    });

    this.reload();

    if (isPlatformBrowser(this.platformId)) {
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
