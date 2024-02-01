export enum ActionTypes {
  SHOW_ALERT = '[APP] Show alert',
  EMPTY = '[APP] empty',

  LOGIN = '[AUTH] Login profile',
  LOGIN_SUCCESS = '[AUTH] Login profile success',
  LOGIN_FAILURE = '[AUTH] Login profile failure',

  LOGOUT = '[AUTH] Logout profile',
  LOGOUT_SUCCESS = '[AUTH] Logout profile success',
  LOGOUT_FAILURE = '[AUTH] Logout profile failure',

  GET_PROFILE = '[PROFILE] Get profile data',
  GET_PROFILE_SUCCESS = '[PROFILE] Get profile data success',
  GET_PROFILE_FAILURE = '[PROFILE] Get profile data failure',

  UPDATE_PROFILE_NAME = '[PROFILE] Update profile name',
  UPDATE_PROFILE_NAME_SUCCESS = '[PROFILE] Update profile name success',
  UPDATE_PROFILE_NAME_FAILURE = '[PROFILE] Update profile name failure',

  GET_GROUPS = '[GROUPS] Get Groups',
  GET_GROUPS_SUCCESS = '[GROUPS] Get Groups success',
  GET_GROUPS_FAILURE = '[GROUPS] Get Groups failure',
  UPDATE_GROUPS_LIST = '[GROUPS] Update Groups List',

  DELETE_GROUPS = '[GROUPS] Delete group',
  DELETE_GROUPS_SUCCESS = '[GROUPS] Delete group success',

  CREATE_GROUPS = '[GROUPS] Create group',
  CREATE_GROUPS_SUCCESS = '[GROUPS] Create group success',

  GET_PEOPLE = '[PEOPLE] Get People',
  GET_PEOPLE_SUCCESS = '[PEOPLE] Get People success',
  GET_PEOPLE_FAILURE = '[PEOPLE] Get People failure',
  UPDATE_PEOPLE_LIST = '[PEOPLE] Update People List',

  GET_CONVERSATIONS = '[PEOPLE] Get Conversations',
  GET_CONVERSATIONS_SUCCESS = '[PEOPLE] Get Conversations success',

  GET_GROUP = '[GROUP] Get Dialog',
  GET_GROUP_SUCCESS = '[GROUP] Get Dialog success',
  GET_GROUP_FAILURE = '[GROUP] Get Dialog failure',
  UPDATE_GROUP = '[GROUP] Update Dialog',
  SEND_MESSAGE_GROUP = '[GROUP] Send message in group',

  GET_CONVERSATION = '[CONVERSATION] Get Conversation',
  GET_CONVERSATION_SUCCESS = '[CONVERSATION] Get Conversation success',
  GET_CONVERSATION_FAILURE = '[CONVERSATION] Get Conversation failure',
  UPDATE_CONVERSATION = '[CONVERSATION] Update Conversation',
  SEND_MESSAGE_CONVERSATION = '[CONVERSATION] Send message in Conversation',
  DELETE_CONVERSATION = '[CONVERSATION] Delete Conversation',
  DELETE_CONVERSATION_SUCCESS = '[CONVERSATION] Delete Conversation success',

  NEW_CONVERSATION = '[CONVERSATION] Get New Conversation',
  NEW_CONVERSATION_SUCCESS = '[CONVERSATION] New Get Conversation success',
  NEW_CONVERSATION_FAILURE = '[CONVERSATION] New Get Conversation failure',
}
