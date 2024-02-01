import { createReducer, on } from '@ngrx/store';
import { IMessage } from 'group/models/dialog.model';
import {
  groupAction,
  groupFailureAction,
  groupSuccessAction,
  updateGroupAction,
} from 'redux/actions/group.actions';

export const GROUP_KEY = 'group';

interface GroupItem {
  visitKey: boolean;
  since: string;
  message: IMessage[];
  updatedAt?: number;
  isLoading: boolean;
}

export interface IGroupState {
  currentGroupID: string;
  data: { [groupID: string]: GroupItem };
}

export const initialState: IGroupState = {
  data: {},
  currentGroupID: '',
};

export const groupReducer = createReducer(
  initialState,
  on(groupAction, (state, { groupID }) => ({
    ...state,
    [groupID]: {
      ...state.data[groupID],
    },
    currentGroupID: groupID,
  })),
  on(groupSuccessAction, (state, { data, groupID }) => {
    if (data.length > 0) {
      return {
        ...state,
        data: {
          ...state.data,
          [groupID]: {
            ...state.data[groupID],
            since: data.at(-1)?.createdAt ?? '',
            message: [...(state.data?.[groupID]?.message ?? []), ...data],
            isLoading: false,
          },
        },
      };
    }
    return {
      ...state,
    };
  }),
  on(groupFailureAction, (state, { groupID }) => ({
    ...state,
    data: {
      ...state.data,
      [groupID]: {
        ...state.data[groupID],
        updatedAt: 0,
        isLoading: false,
      },
    },
  })),

  on(updateGroupAction, (state, { groupID }) => ({
    ...state,
    data: {
      ...state.data,
      [groupID]: {
        ...state.data[groupID],
        updatedAt: Date.now(),
      },
    },
  })),
);
