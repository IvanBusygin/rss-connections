import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from 'auth/services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router: Router = inject(Router);

  const authService = inject(AuthService);

  const { user } = authService;

  if (user?.token) {
    return true;
  }
  return router.navigate(['signin']);
};
