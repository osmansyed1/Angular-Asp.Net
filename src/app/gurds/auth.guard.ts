import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthServiceService } from '../Auth/auth-service.service';

export const authGuard: CanActivateFn = (route, state) => {

const authService=inject(AuthServiceService)
const router=inject(Router)

if (authService.isLoggedIn()) {
  return true; // User is logged in
}
router.navigate(['/login']); // Redirect to login if not authenticated
return false; // Deny access
};
