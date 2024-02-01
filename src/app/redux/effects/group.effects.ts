import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { DialogService } from 'group/services/dialog.service';
import { showAlertAction } from 'redux/actions/app.actions';
import {
  groupAction,
  groupFailureAction,
  groupSuccessAction,
  sendMessageGroupAction,
  updateGroupAction,
} from 'redux/actions/group.actions';
import { selectCurrentGroup } from 'redux/selectors/group.selectors';
import { catchError, map, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GroupEffects {
  getGroupEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(groupAction, updateGroupAction),
      concatLatestFrom(() => this.store.select(selectCurrentGroup)),
      switchMap(([{ groupID }, groups]) => {
        return this.dialogService.getDialogList(groupID, groups?.since).pipe(
          map((response) => {
            return groupSuccessAction({ data: response, groupID });
          }),

          catchError((err) => {
            return of(
              groupFailureAction({ groupID }),
              showAlertAction({ msg: err.error.message, option: 'fail' }),
            );
          }),
        );
      }),
    );
  });

  sendMessageGroupEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(sendMessageGroupAction),
      switchMap(({ groupID, message }) => {
        return this.dialogService.sendMessage({ groupID, message }).pipe(
          switchMap(() => {
            return of(groupAction({ groupID }));
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
    private dialogService: DialogService,
    private store: Store,
  ) {}
}
