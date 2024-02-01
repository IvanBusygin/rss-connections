import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { AuthService } from 'auth/services/auth.service';
import { GroupsService } from 'groups/services/groups.service';
import { emptyAction, showAlertAction } from 'redux/actions/app.actions';
import {
  createGroupAction,
  createGroupSuccessAction,
  deleteGroupsAction,
  deleteGroupsSuccessAction,
  groupsAction,
  groupsFailureAction,
  groupsSuccessAction,
  updateGroupsAction,
} from 'redux/actions/groups.actions';
import { selectVisitKey } from 'redux/selectors/groups.selectors';
import { catchError, map, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GroupsEffects {
  getGroupsEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(groupsAction, updateGroupsAction),
      concatLatestFrom(() => this.store.select(selectVisitKey)),
      switchMap(([action, visitKey]) => {
        if (visitKey) {
          return of(emptyAction());
        }

        return this.groupsService.getGroupsList().pipe(
          map((response) => {
            return groupsSuccessAction({ data: response });
          }),

          catchError((err) => {
            return of(
              groupsFailureAction(),
              showAlertAction({ msg: err.error.message, option: 'fail' }),
            );
          }),
        );
      }),
    );
  });

  createGroupEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(createGroupAction),
      switchMap(({ name, closeModal }) => {
        return this.groupsService.createGroup({ name }).pipe(
          switchMap(({ groupID }) => {
            const { uid } = this.authService.user;

            closeModal();

            return of(
              createGroupSuccessAction({
                group: {
                  createdAt: `${Date.now()}`,
                  id: groupID,
                  createdBy: uid,
                  name,
                },
              }),
              showAlertAction({ msg: 'New group created successfully', option: 'ok' }),
            );
          }),

          catchError((err) => {
            return of(showAlertAction({ msg: err.error.message, option: 'fail' }));
          }),
        );
      }),
    );
  });

  deleteGroupEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(deleteGroupsAction),
      switchMap(({ groupID }) => {
        return this.groupsService.deleteGroup(groupID).pipe(
          switchMap(() => {
            this.router.navigate(['/']);

            return of(
              deleteGroupsSuccessAction({ groupID }),
              showAlertAction({ msg: 'The group deleted successfully', option: 'ok' }),
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
    private groupsService: GroupsService,
    private store: Store,
    private authService: AuthService,
    private router: Router,
  ) {}
}
