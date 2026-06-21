import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map, take } from 'rxjs';

export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  return auth.isAuthenticated$.pipe(
    take(1),
    map((isAuth) => {
      if (isAuth) return true;
      router.navigate(['/login']); // Show local login page instead of auto-hosted UI
      return false;
    })
  );
};
