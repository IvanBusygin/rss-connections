import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from 'auth/services/auth.service';
import { showAlertAction } from 'redux/actions/app.actions';
import {
  loginAction,
  loginFailureAction,
  loginSuccessAction,
  logoutAction,
  logoutFailureAction,
  logoutSuccessAction,
} from 'redux/actions/auth.actions';
import { catchError, of, switchMap, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthEffects {
  loginEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loginAction),
      switchMap(({ email, password }) => {
        return this.authService.login({ email, password }).pipe(
          tap(() => {
            this.router.navigate(['./']);
          }),
          switchMap(() => {
            return of(
              loginSuccessAction(),
              showAlertAction({ msg: 'Login is successfully', option: 'ok' }),
            );
          }),
          catchError((err) => {
            return of(
              loginFailureAction(),
              showAlertAction({ msg: err.error.message, option: 'fail' }),
            );
          }),
        );
      }),
    );
  });

  logoutEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(logoutAction),
      switchMap(() => {
        return this.authService.logout().pipe(
          tap(() => {
            this.router.navigate(['./signin']);
          }),
          switchMap(() => {
            return of(
              logoutSuccessAction(),
              showAlertAction({ msg: 'Logout successfully', option: 'ok' }),
            );
          }),
          catchError((err) => {
            if (err.error.type === 'InvalidTokenException') {
              this.authService.reset();
              this.router.navigate(['./signin']);
            }
            return of(
              logoutFailureAction(),
              showAlertAction({ msg: err.error.message, option: 'fail' }),
            );
          }),
        );
      }),
    );
  });

  constructor(
    private actions$: Actions,
    private router: Router,
    private authService: AuthService,
  ) {}
}
