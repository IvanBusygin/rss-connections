import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ProfileService } from 'profile/services/profile.service';
import { showAlertAction } from 'redux/actions/app.actions';
import {
  getProfileAction,
  getProfileFailureAction,
  getProfileSuccessAction,
  upDateProfileNameAction,
  upDateProfileNameSuccessAction,
} from 'redux/actions/profile.actions';
import { selectProfile } from 'redux/selectors/profile.selectors';
import { catchError, map, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfileEffects {
  getProfileEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getProfileAction),
      concatLatestFrom(() => this.store.select(selectProfile)),
      switchMap(([action, profile]) => {
        if (profile) {
          return of(getProfileSuccessAction({ data: profile }));
        }
        return this.profileService.getProfile().pipe(
          map((response) => {
            return getProfileSuccessAction({ data: response });
          }),

          catchError((err) => {
            return of(
              getProfileFailureAction(),
              showAlertAction({ msg: err.error.message, option: 'fail' }),
            );
          }),
        );
      }),
    );
  });

  upDateProfileNameEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(upDateProfileNameAction),
      switchMap(({ name }) => {
        return this.profileService.upDateProfileName({ name }).pipe(
          switchMap(() => {
            return of(
              showAlertAction({ msg: 'Your name changed successfully', option: 'ok' }),
              upDateProfileNameSuccessAction({ newName: name }),
            );
          }),

          catchError((err) => {
            return of(showAlertAction({ msg: err.error.message, option: 'fail' }));
          }),
        );
      }),
    );
  });

  constructor(
    private actions$: Actions,
    private profileService: ProfileService,
    private store: Store,
  ) {}
}
