import { Component, Inject, PLATFORM_ID, OnInit } from '@angular/core';

import { AuthService } from '../../services/auth.service';
import { CookiesService } from '../../services/cookies.service';
import { Role } from '../../../nooble/api-objs/Role';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { PathResolverService } from '../../services/path-resolver.service';
import { FileType } from '../../../nooble/api-objs/FileType';
import { ApiService } from '../../services/api.service';
import { Profile } from '../../../nooble/api-objs/Profile';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FormsModule, RouterLink, CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  currentProfile: Profile | null = null;
  adminEnabled = false;

  constructor(
    private authService: AuthService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private pathResolver: PathResolverService,
    private apiService: ApiService,
    private cookiesService: CookiesService
  ) { }

  reload(profile: Profile | null): void {
    this.currentProfile = profile!;
  }

  get currentUserImage()
  {
    return (this.currentProfile && this.currentProfile.profile_image)?this.pathResolver.getResourcePath(this.currentProfile.profile_image, FileType.PROFILE_ICON):"/images/icons/user.png";
  }

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    // S'abonner à l'observable du service AuthService pour écouter les changements d'utilisateur
    this.authService.authStatusChanged.subscribe(authState => {
      if (authState.connected === false) this.reload(null)
      
      else this.reload({...authState.account!.profile, role:authState.account!.role})
    });

    this.apiService.profile.profileChanged.subscribe(newProfile => {
      this.reload(newProfile);
    });

    if (isPlatformBrowser(this.platformId)) {
      this.adminEnabled = this.cookiesService.adminEnabled
    }
  }

  get isAdmin(): boolean {
    return (this.currentProfile?.role == Role.ADMIN || this.currentProfile?.role == Role.TEACHER_ADMIN) ?? false;
  }

  get isTeacher(): boolean {
    return (this.currentProfile?.role == Role.TEACHER || this.currentProfile?.role == Role.TEACHER_ADMIN) ?? false;
  }

  onAdminSwitchChange(): void {
    this.cookiesService.setAdminMode(this.adminEnabled);
  }
}
