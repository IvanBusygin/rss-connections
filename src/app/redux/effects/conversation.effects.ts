import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ConversationService } from 'conversation/services/conversation.service';
import { showAlertAction } from 'redux/actions/app.actions';
import {
  conversationAction,
  conversationFailureAction,
  conversationSuccessAction,
  sendMessageConversationAction,
  updateConversationAction,
} from 'redux/actions/conversation.actions';
import { selectCurrentConversation } from 'redux/selectors/conversation.selectors';
import { catchError, map, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConversationEffects {
  getConversationEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(conversationAction, updateConversationAction),
      concatLatestFrom(() => this.store.select(selectCurrentConversation)),
      switchMap(([{ conversationID }, conversation]) => {
        return this.conversationService
          .getConversationList(conversationID, conversation?.since)
          .pipe(
            map((response) => {
              return conversationSuccessAction({ data: response, conversationID });
            }),

            catchError((err) => {
              return of(
                conversationFailureAction({ conversationID }),
                showAlertAction({ msg: err.error.message, option: 'fail' }),
              );
            }),
          );
      }),
    );
  });

  sendMessageConversationEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(sendMessageConversationAction),
      switchMap(({ conversationID, message }) => {
        return this.conversationService.sendMessageConversation({ conversationID, message }).pipe(
          switchMap(() => {
            return of(conversationAction({ conversationID }));
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
    private conversationService: ConversationService,
    private store: Store,
  ) {}
}
