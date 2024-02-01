import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ConversationService } from 'conversation/services/conversation.service';
import { PeopleService } from 'people/services/people.service';
import { emptyAction, showAlertAction } from 'redux/actions/app.actions';
import {
  conversationsAction,
  conversationsSuccessAction,
  deleteConversationAction,
  deleteConversationSuccessAction,
  newConversationsAction,
  newConversationsSuccessAction,
  peopleAction,
  peopleFailureAction,
  peopleSuccessAction,
  updatePeopleAction,
} from 'redux/actions/people.actions';
import { selectPeopleVisitKey, selectPeopleVisitKey2 } from 'redux/selectors/people.selectors';
import { catchError, map, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PeopleEffects {
  getPeopleEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(peopleAction, updatePeopleAction),
      concatLatestFrom(() => this.store.select(selectPeopleVisitKey)),
      switchMap(([action, visitKey]) => {
        if (visitKey) {
          return of(emptyAction());
        }

        return this.peopleService.getPeopleList().pipe(
          map((response) => {
            return peopleSuccessAction({ data: response });
          }),

          catchError((err) => {
            return of(
              peopleFailureAction(),
              showAlertAction({ msg: err.error.message, option: 'fail' }),
            );
          }),
        );
      }),
    );
  });

  getConversationsEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(conversationsAction, updatePeopleAction),
      concatLatestFrom(() => this.store.select(selectPeopleVisitKey2)),
      switchMap(([action, visitKey]) => {
        if (visitKey) {
          return of(emptyAction());
        }

        return this.peopleService.getConversationsList().pipe(
          map((response) => {
            return conversationsSuccessAction({ data: response });
          }),

          catchError((err) => {
            return of(showAlertAction({ msg: err.error.message, option: 'fail' }));
          }),
        );
      }),
    );
  });

  newConversationsEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(newConversationsAction),
      switchMap(({ companionID }) => {
        return this.peopleService.createsConversations({ companion: companionID }).pipe(
          map(({ conversationID }) => {
            this.router.navigate(['./conversation', conversationID]);
            return newConversationsSuccessAction({ id: conversationID, companionID });
          }),

          catchError((err) => {
            return of(showAlertAction({ msg: err.error.message, option: 'fail' }));
          }),
        );
      }),
    );
  });

  deleteConversationEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(deleteConversationAction),
      switchMap(({ conversationID }) => {
        return this.conversationService.deleteConversation(conversationID).pipe(
          switchMap(() => {
            this.router.navigate(['/']);

            return of(
              deleteConversationSuccessAction({ conversationID }),
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
    private peopleService: PeopleService,
    private store: Store,
    private router: Router,
    private conversationService: ConversationService,
  ) {}
}
