import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const disconnectedGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (!auth.isConnectionStatusKnown()) {
    return true;
  }

  return (auth.isConnectionStatusKnown() && !auth.isLoggedIn()) ? true : router.parseUrl('/');
};
