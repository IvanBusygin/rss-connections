import { createReducer, on } from '@ngrx/store';
import { Conversations, People } from 'people/models/people.model';
import {
  conversationsSuccessAction,
  deleteConversationSuccessAction,
  newConversationsSuccessAction,
  peopleAction,
  peopleFailureAction,
  peopleSuccessAction,
  updatePeopleAction,
} from 'redux/actions/people.actions';

export const PEOPLE_KEY = 'people';

export interface IPeopleState {
  visitKey: boolean;
  people: People[];
  visitKey2: boolean;
  conversations: Conversations[];
  updatedAt: number;
  timeLeft: number;
  isLoading: boolean;
  fault: boolean;
}

export const initialState: IPeopleState = {
  visitKey: false,
  people: [],
  visitKey2: false,
  conversations: [],
  updatedAt: 0,
  timeLeft: 0,
  isLoading: false,
  fault: false,
};

export const peopleReducer = createReducer(
  initialState,
  on(peopleAction, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(peopleSuccessAction, (state, action) => ({
    ...state,
    people: action.data,
    isLoading: false,
    visitKey: true,
  })),
  on(peopleFailureAction, (state) => ({
    ...state,
    isLoading: false,
  })),

  on(conversationsSuccessAction, (state, action) => ({
    ...state,
    conversations: action.data,
    isLoading: false,
    visitKey2: true,
  })),

  on(updatePeopleAction, (state) => ({
    ...state,
    visitKey: false,
    visitKey2: false,
    updatedAt: Date.now(),
  })),

  on(newConversationsSuccessAction, (state, action) => ({
    ...state,
    conversations: [...state.conversations, action],
  })),

  on(deleteConversationSuccessAction, (state, action) => ({
    ...state,
    conversations: state.conversations.filter((item) => item.id !== action.conversationID),
  })),
);
