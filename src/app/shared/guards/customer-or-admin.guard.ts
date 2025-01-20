import { CanActivateFn } from '@angular/router';

export const customerOrAdminGuard: CanActivateFn = (route, state) => {
  return true;
};
