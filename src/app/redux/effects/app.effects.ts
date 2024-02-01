import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { emptyAction, showAlertAction } from 'redux/actions/app.actions';
import { map, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppEffects {
  showAlertEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(showAlertAction),
      switchMap((action) => {
        return this.showSnackBar(action.msg, action.option)
          .afterDismissed()
          .pipe(map(() => emptyAction()));
      }),
    );
  });

  private showSnackBar(msg: string, option: string) {
    return this.snackBar.open(msg, option === 'ok' ? 'Success' : 'ERROR', {
      verticalPosition: 'top',
      horizontalPosition: 'center',
      panelClass: [option === 'ok' ? 'success-snackbar' : 'error-snackbar'],
      duration: option === 'ok' ? 3000 : 9000,
    });
  }

  constructor(
    private actions$: Actions,
    private snackBar: MatSnackBar,
  ) {}
}
