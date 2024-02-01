import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { headersInterceptorFn } from 'core/interceptors/headers.interceptorFn';
import { urlInterceptorFn } from 'core/interceptors/url.interceptorFn';
import { effects, metaReducers, reducers } from 'redux/index';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    provideStore(reducers, { metaReducers }),
    provideEffects(effects),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideHttpClient(withInterceptors([urlInterceptorFn, headersInterceptorFn])),
  ],
};
