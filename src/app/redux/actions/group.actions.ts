import { createAction, props } from '@ngrx/store';
import { IMessage } from 'group/models/dialog.model';
import { ActionTypes } from 'redux/actions/actionTypes';

export const groupAction = createAction(ActionTypes.GET_GROUP, props<{ groupID: string }>());

export const groupSuccessAction = createAction(
  ActionTypes.GET_GROUP_SUCCESS,
  props<{ data: IMessage[]; groupID: string }>(),
);

export const groupFailureAction = createAction(
  ActionTypes.GET_GROUP_FAILURE,
  props<{ groupID: string }>(),
);

export const updateGroupAction = createAction(
  ActionTypes.UPDATE_GROUP,
  props<{ groupID: string }>(),
);

export const sendMessageGroupAction = createAction(
  ActionTypes.SEND_MESSAGE_GROUP,
  props<{ groupID: string; message: string }>(),
);
