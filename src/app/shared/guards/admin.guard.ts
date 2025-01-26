import { CanActivateFn } from '@angular/router';
import { inject, Inject } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const decodedToken = authService.decodeToken();
  if (decodedToken?.role === 'ADMIN') {
    return true; 
  } else {
    router.navigate(['/not-authorized']); 
    return false;
  }
};
