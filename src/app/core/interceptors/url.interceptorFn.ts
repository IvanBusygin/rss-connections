import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environment';

export function urlInterceptorFn(
  request: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> {
  return next(
    request.clone({
      url: `${environment.URL_BASE}/${request.url}`,
    }),
  );
}
