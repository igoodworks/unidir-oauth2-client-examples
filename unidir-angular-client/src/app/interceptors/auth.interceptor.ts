import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { from, switchMap } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);
  const deviceId = localStorage.getItem('unidir_device_id');
  // Convert promise-based getToken to Observable
  return from(auth.getAccessToken()).pipe(
    switchMap((token) => {
      if (token) {
        const authReq = req.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`,
            'x-device-id': deviceId ?? '',
          },
        });
        return next(authReq);
      }
      return next(req);
    })
  );
};
