import { HttpInterceptorFn } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID, inject } from '@angular/core';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const platformId = inject(PLATFORM_ID);
  let authToken = '';

  if (isPlatformBrowser(platformId)) {
    authToken = localStorage.getItem('auth_token') || '';
  }

  if (authToken) {
    const authReq = req.clone({
      headers: req.headers.set('Authorization', authToken)
    });
    return next(authReq);
  }

  return next(req);
};