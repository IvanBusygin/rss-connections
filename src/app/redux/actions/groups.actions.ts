import { createAction, props } from '@ngrx/store';
import { Groups } from 'groups/models/groups.model';
import { ActionTypes } from 'redux/actions/actionTypes';

export const groupsAction = createAction(ActionTypes.GET_GROUPS);

export const groupsSuccessAction = createAction(
  ActionTypes.GET_GROUPS_SUCCESS,
  props<{ data: Groups[] }>(),
);

export const groupsFailureAction = createAction(ActionTypes.GET_GROUPS_FAILURE);

export const updateGroupsAction = createAction(ActionTypes.UPDATE_GROUPS_LIST);

export const createGroupAction = createAction(
  ActionTypes.CREATE_GROUPS,
  props<{ name: string; closeModal: () => void }>(),
);

export const createGroupSuccessAction = createAction(
  ActionTypes.CREATE_GROUPS_SUCCESS,
  props<{ group: Groups }>(),
);

export const deleteGroupsAction = createAction(
  ActionTypes.DELETE_GROUPS,
  props<{ groupID: string }>(),
);
export const deleteGroupsSuccessAction = createAction(
  ActionTypes.DELETE_GROUPS_SUCCESS,
  props<{ groupID: string }>(),
);
