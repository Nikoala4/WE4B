import { Injectable } from '@angular/core';
import { Account } from '../../nooble/api-objs/Account';
import { ApiAuthenticationService } from './api-authentication.service';
import { ApiLogInfoResponse } from '../../nooble/api-comm/LogInfoResponse';
import { Observable, Subject, tap } from 'rxjs';
import { Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Role } from '../../nooble/api-objs/Role';
import { Router } from '@angular/router';
import { ApiLoginResponse } from '../../nooble/api-comm/LoginResponse';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  logInfo: ApiLogInfoResponse | null = null

  constructor(
    private authApi: ApiAuthenticationService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router
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
    return this.logInfo?.account?.role === Role.ADMIN || this.logInfo?.account?.role === Role.TEACHER_ADMIN;
  }

  isTeacher(): boolean {
    return this.logInfo?.account?.role === Role.TEACHER || this.logInfo?.account?.role === Role.TEACHER_ADMIN;
  }

  isStudent(): boolean {
    return this.logInfo?.account?.role === Role.STUDENT;
  }

  getCurrentUser(): Account | null {
    return this.logInfo?.account ?? null;
  }

  login(mail_address: string, password: string): Observable<ApiLoginResponse> {
    return this.authApi.login(mail_address, password).pipe(
      tap((response: ApiLoginResponse) => {
        this.reloadLogInfo();
      })
    );
  }

  reloadLogInfo(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.authApi.getLogInfo().subscribe(logInfo => {
        this.logInfo = logInfo;
        this.authStatusChanged.next(logInfo);

        console.log("Log info:", logInfo);

        let currentUrl = this.router.url;
        this.router.navigateByUrl('/redirect', { skipLocationChange: true }).then(() => {
          this.router.navigateByUrl(currentUrl);
        });
        
      });
    }
  }

  init(): void {
    this.reloadLogInfo();
  }

}
