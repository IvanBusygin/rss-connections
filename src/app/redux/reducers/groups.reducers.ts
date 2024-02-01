import { createReducer, on } from '@ngrx/store';
import { Groups } from 'groups/models/groups.model';
import {
  createGroupSuccessAction,
  deleteGroupsSuccessAction,
  groupsAction,
  groupsFailureAction,
  groupsSuccessAction,
  updateGroupsAction,
} from 'redux/actions/groups.actions';

export const GROUPS_KEY = 'groups';

export interface IGroupsState {
  visitKey: boolean;
  data: Groups[];
  updatedAt: number;
  isLoading: boolean;
  fault: boolean;
}

export const initialState: IGroupsState = {
  visitKey: false,
  data: [],
  updatedAt: 0,
  isLoading: false,
  fault: false,
};

export const groupsReducer = createReducer(
  initialState,
  on(groupsAction, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(groupsSuccessAction, (state, action) => ({
    ...state,
    data: action.data,
    isLoading: false,
    visitKey: true,
  })),
  on(groupsFailureAction, (state) => ({
    ...state,
    isLoading: false,
  })),

  on(updateGroupsAction, (state) => ({
    ...state,
    visitKey: false,
    updatedAt: Date.now(),
  })),

  on(deleteGroupsSuccessAction, (state, action) => ({
    ...state,
    data: [...state.data.filter((item) => item.id !== action.groupID)],
  })),

  on(createGroupSuccessAction, (state, action) => ({
    ...state,
    data: [action.group, ...state.data],
  })),
);
