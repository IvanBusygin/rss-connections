import { Location } from '@angular/common';
import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from 'auth/services/auth.service';

export const notAuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);

  const location: Location = inject(Location);

  const { user } = authService;

  if (user?.token) {
    location.back();
    return false;
  }
  return true;
};
