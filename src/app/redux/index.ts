import { isDevMode } from '@angular/core';
import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { AppEffects } from 'redux/effects/app.effects';
import { AuthEffects } from 'redux/effects/auth.effects';
import { ConversationEffects } from 'redux/effects/conversation.effects';
import { GroupEffects } from 'redux/effects/group.effects';
import { GroupsEffects } from 'redux/effects/groups.effects';
import { PeopleEffects } from 'redux/effects/people.effects';
import { ProfileEffects } from 'redux/effects/profile.effects';
import {
  CONVERSATION_KEY,
  conversationReducer,
  IConversationState,
} from 'redux/reducers/conversation.reducers';
import { GROUP_KEY, groupReducer, IGroupState } from 'redux/reducers/group.reducers';
import { GROUPS_KEY, groupsReducer, IGroupsState } from 'redux/reducers/groups.reducers';
import { IPeopleState, PEOPLE_KEY, peopleReducer } from 'redux/reducers/people.reducers';
import { IProfileState, PROFILE_KEY, profileReducer } from 'redux/reducers/profile.reducers';

export interface State {
  [PROFILE_KEY]: IProfileState;
  [GROUPS_KEY]: IGroupsState;
  [PEOPLE_KEY]: IPeopleState;
  [GROUP_KEY]: IGroupState;
  [CONVERSATION_KEY]: IConversationState;
}

export const reducers: ActionReducerMap<State> = {
  [PROFILE_KEY]: profileReducer,
  [GROUPS_KEY]: groupsReducer,
  [PEOPLE_KEY]: peopleReducer,
  [GROUP_KEY]: groupReducer,
  [CONVERSATION_KEY]: conversationReducer,
};

export const metaReducers: MetaReducer<State>[] = isDevMode() ? [] : [];

export const effects = [
  AppEffects,
  ProfileEffects,
  AuthEffects,
  GroupsEffects,
  PeopleEffects,
  GroupEffects,
  ConversationEffects,
];
