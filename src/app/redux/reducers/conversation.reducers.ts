import { createReducer, on } from '@ngrx/store';
import { IMessage } from 'group/models/dialog.model';
import {
  conversationAction,
  conversationFailureAction,
  conversationSuccessAction,
  updateConversationAction,
} from 'redux/actions/conversation.actions';

export const CONVERSATION_KEY = 'conversation';

interface ConversationItem {
  visitKey: boolean;
  since: string;
  message: IMessage[];
  updatedAt?: number;
  isLoading: boolean;
}

export interface IConversationState {
  currentGroupID: string;
  data: { [groupID: string]: ConversationItem };
}

export const initialState: IConversationState = {
  data: {},
  currentGroupID: '',
};

export const conversationReducer = createReducer(
  initialState,
  on(conversationAction, (state, { conversationID }) => ({
    ...state,
    [conversationID]: {
      ...state.data[conversationID],
    },
    currentGroupID: conversationID,
  })),
  on(conversationSuccessAction, (state, { data, conversationID }) => {
    if (data.length > 0) {
      return {
        ...state,
        data: {
          ...state.data,
          [conversationID]: {
            ...state.data[conversationID],
            since: data.at(-1)?.createdAt ?? '',
            message: [...(state.data?.[conversationID]?.message ?? []), ...data],
            isLoading: false,
          },
        },
      };
    }
    return {
      ...state,
    };
  }),
  on(conversationFailureAction, (state, { conversationID }) => ({
    ...state,
    data: {
      ...state.data,
      [conversationID]: {
        ...state.data[conversationID],
        updatedAt: 0,
        isLoading: false,
      },
    },
  })),

  on(updateConversationAction, (state, { conversationID }) => ({
    ...state,
    data: {
      ...state.data,
      [conversationID]: {
        ...state.data[conversationID],
        updatedAt: Date.now(),
      },
    },
  })),
);
