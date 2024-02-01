import { createReducer, on } from '@ngrx/store';
import { IProfile } from 'profile/models/profile.model';
import {
  getProfileAction,
  getProfileFailureAction,
  getProfileSuccessAction,
  upDateProfileNameAction,
  upDateProfileNameFailureAction,
  upDateProfileNameSuccessAction,
} from 'redux/actions/profile.actions';

export const PROFILE_KEY = 'profile';

export interface IProfileState {
  data: IProfile | null;
  isLoading: boolean;
  fault: boolean;
}

export const initialState: IProfileState = {
  data: null,
  isLoading: false,
  fault: false,
};

export const profileReducer = createReducer(
  initialState,
  on(getProfileAction, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(getProfileSuccessAction, (state, action) => ({
    ...state,
    isLoading: false,
    data: action.data,
    fault: false,
  })),
  on(getProfileFailureAction, (state) => ({
    ...state,
    isLoading: false,
    fault: true,
  })),
  on(upDateProfileNameAction, (state) => ({
    ...state,
    isLoading: true,
    fault: true,
  })),
  on(upDateProfileNameSuccessAction, (state, action) => {
    if (state.data) {
      return {
        ...state,
        isLoading: false,
        fault: false,
        data: { ...state.data, name: action.newName },
      };
    }
    return { ...state };
  }),
  on(upDateProfileNameFailureAction, (state) => ({
    ...state,
    isLoading: false,
    fault: true,
  })),
);
