import { createAction, props } from '@ngrx/store';
import { Conversations, People } from 'people/models/people.model';
import { ActionTypes } from 'redux/actions/actionTypes';

export const peopleAction = createAction(ActionTypes.GET_PEOPLE);

export const peopleSuccessAction = createAction(
  ActionTypes.GET_PEOPLE_SUCCESS,
  props<{ data: People[] }>(),
);

export const peopleFailureAction = createAction(ActionTypes.GET_PEOPLE_FAILURE);

export const updatePeopleAction = createAction(ActionTypes.UPDATE_PEOPLE_LIST);

export const conversationsAction = createAction(ActionTypes.GET_CONVERSATIONS);

export const conversationsSuccessAction = createAction(
  ActionTypes.GET_CONVERSATIONS_SUCCESS,
  props<{ data: Conversations[] }>(),
);

export const newConversationsAction = createAction(
  ActionTypes.NEW_CONVERSATION,
  props<{ companionID: string }>(),
);
export const newConversationsSuccessAction = createAction(
  ActionTypes.NEW_CONVERSATION_SUCCESS,
  props<{ companionID: string; id: string }>(),
);

export const deleteConversationAction = createAction(
  ActionTypes.DELETE_CONVERSATION,
  props<{ conversationID: string }>(),
);
export const deleteConversationSuccessAction = createAction(
  ActionTypes.DELETE_CONVERSATION_SUCCESS,
  props<{ conversationID: string }>(),
);
