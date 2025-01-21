import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../service/auth.service'; 
import { Router } from '@angular/router';

export const customerOrAdminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const decodedToken = authService.decodeToken();
  console.log('Combined Guard - Decoded Token:', decodedToken);

  if (decodedToken?.role === 'CUSTOMER' || decodedToken?.role === 'ADMIN') {
    return true;
  } else {
    router.navigate(['/not-authorized']);
    return false;
  }
};