import { createAction, props } from '@ngrx/store';
import { ActionTypes } from 'redux/actions/actionTypes';

export const showAlertAction = createAction(
  ActionTypes.SHOW_ALERT,
  props<{ msg: string; option: 'ok' | 'fail' }>(),
);

export const emptyAction = createAction(ActionTypes.EMPTY);
