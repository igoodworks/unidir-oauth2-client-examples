import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map, skipWhile, take } from 'rxjs';

export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);

  return auth.isAuthenticated$.pipe(
    take(1),
    map((isAuth) => {
      if (isAuth) return true;
      auth.login(); // Redirect to UniDir if not logged in
      return false;
    })
  );
};
