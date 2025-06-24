import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const adminGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (!auth.isConnectionStatusKnown()) {
    return true;
  }

  return (auth.isConnectionStatusKnown() && auth.isAdmin())? true : router.parseUrl('/');
};
