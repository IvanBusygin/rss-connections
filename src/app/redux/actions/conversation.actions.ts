import { createAction, props } from '@ngrx/store';
import { IMessage } from 'group/models/dialog.model';
import { ActionTypes } from 'redux/actions/actionTypes';

export const conversationAction = createAction(
  ActionTypes.GET_CONVERSATION,
  props<{ conversationID: string }>(),
);

export const conversationSuccessAction = createAction(
  ActionTypes.GET_CONVERSATION_SUCCESS,
  props<{ data: IMessage[]; conversationID: string }>(),
);

export const conversationFailureAction = createAction(
  ActionTypes.GET_CONVERSATION_FAILURE,
  props<{ conversationID: string }>(),
);

export const updateConversationAction = createAction(
  ActionTypes.UPDATE_CONVERSATION,
  props<{ conversationID: string }>(),
);

export const sendMessageConversationAction = createAction(
  ActionTypes.SEND_MESSAGE_CONVERSATION,
  props<{ conversationID: string; message: string }>(),
);
