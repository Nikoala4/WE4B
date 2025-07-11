import { Injectable } from '@angular/core';
import { Account } from '../../nooble/api-objs/Account';
import { ApiLogInfoResponse } from '../../nooble/api-comm/LogInfoResponse';
import { Observable, Subject } from 'rxjs';
import { Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Role } from '../../nooble/api-objs/Role';
import { Router } from '@angular/router';
import { ApiLoginResponse } from '../../nooble/api-comm/LoginResponse';
import lodashUtils from 'lodash';
import { ApiService } from './api.service';
import { CookiesService } from './cookies.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  logInfo: ApiLogInfoResponse | null = null

  constructor(
    private api: ApiService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router,
    private cookies: CookiesService
  ) {
    this.init();
  }

  authStatusChanged = new Subject<ApiLogInfoResponse>();

  isConnectionStatusKnown(): boolean {
    return this.logInfo !== null;
  }

  isLoggedIn(): boolean {
    return this.logInfo?.connected ?? false;
  }

  isAdmin(): boolean {
    return this.logInfo?.account?.role === Role.ADMIN || (this.logInfo?.account?.role === Role.TEACHER_ADMIN && this.cookies.adminEnabled);
  }

  isTeacher(): boolean {
    return this.logInfo?.account?.role === Role.TEACHER || (this.logInfo?.account?.role === Role.TEACHER_ADMIN && !this.cookies.adminEnabled);
  }

  isStudent(): boolean {
    return this.logInfo?.account?.role === Role.STUDENT;
  }

  get currentRole(): Role.ADMIN | Role.STUDENT | Role.TEACHER | undefined
  {
    if (this.currentUser?.role === Role.TEACHER_ADMIN)
    {
      return this.cookies.adminEnabled? Role.ADMIN : Role.TEACHER;
    } else {
      return this.currentUser?.role ?? undefined;
    }
  }

  get currentUser(): Account | null {   
    return this.logInfo?.account ?? null;
  }

  login(mail_address: string, password: string): Observable<ApiLoginResponse> {
    let request = this.api.authentication.login(mail_address, password)
    
    request.subscribe({
      next: (response: ApiLoginResponse) => {
        setTimeout(() => {
          this.reloadLogInfo();
        }, 2000);
      }
    });

    return request;
  }

  logout()
  {
    let request = this.api.authentication.logout()
    
    request.subscribe({
      next: () => {
        this.reloadLogInfo();
      }
    });

    return request;
  }

  launchForgotPasswordProcess(mail_address: string): Observable<ApiLoginResponse> {
    return this.api.authentication.launchForgotPasswordProcess(mail_address)
  }

  reloadLogInfo(): void {
    this.api.authentication.getLogInfo().subscribe(logInfo => {
      if (lodashUtils.isEqual(logInfo, this.logInfo)) return;

      this.logInfo = logInfo;
      this.authStatusChanged.next(logInfo);

      let currentUrl = this.router.url;
      this.router.navigateByUrl('/redirect', { skipLocationChange: true }).then(() => {
        this.router.navigateByUrl(currentUrl);
      });
      
    });
  }

  init(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.reloadLogInfo();
    }

  }

}
