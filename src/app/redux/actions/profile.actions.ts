import { createAction, props } from '@ngrx/store';
import { IProfile } from 'profile/models/profile.model';
import { ActionTypes } from 'redux/actions/actionTypes';

export const getProfileAction = createAction(ActionTypes.GET_PROFILE);

export const getProfileSuccessAction = createAction(
  ActionTypes.GET_PROFILE_SUCCESS,
  props<{ data: IProfile }>(),
);

export const getProfileFailureAction = createAction(ActionTypes.GET_PROFILE_FAILURE);

export const upDateProfileNameAction = createAction(
  ActionTypes.UPDATE_PROFILE_NAME,
  props<{ name: string }>(),
);

export const upDateProfileNameSuccessAction = createAction(
  ActionTypes.UPDATE_PROFILE_NAME_SUCCESS,
  props<{ newName: string }>(),
);

export const upDateProfileNameFailureAction = createAction(ActionTypes.UPDATE_PROFILE_NAME_FAILURE);
