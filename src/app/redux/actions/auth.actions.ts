import { createAction, props } from '@ngrx/store';
import { ActionTypes } from 'redux/actions/actionTypes';

export const loginAction = createAction(
  ActionTypes.LOGIN,
  props<{ email: string; password: string }>(),
);

export const loginSuccessAction = createAction(ActionTypes.LOGIN_SUCCESS);

export const loginFailureAction = createAction(ActionTypes.LOGIN_FAILURE);

export const logoutAction = createAction(ActionTypes.LOGOUT);

export const logoutSuccessAction = createAction(ActionTypes.LOGOUT_SUCCESS);

export const logoutFailureAction = createAction(ActionTypes.LOGOUT_FAILURE);
