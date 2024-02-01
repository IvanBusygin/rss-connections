import { HttpEvent, HttpHandlerFn, HttpHeaders, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from 'auth/services/auth.service';
import { Observable } from 'rxjs';

export function headersInterceptorFn(
  request: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> {
  const auth = inject(AuthService);

  const { user } = auth;

  const headers = new HttpHeaders({
    Authorization: `Bearer ${user?.token}`,
    'rs-uid': `${user?.uid}`,
    'rs-email': `${user.email}`,
  });

  return next(
    request.clone({
      headers,
    }),
  );
}
