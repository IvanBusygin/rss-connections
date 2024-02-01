import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CONVERSATION_KEY, IConversationState } from 'redux/reducers/conversation.reducers';

export const selectFeature = createFeatureSelector<IConversationState>(CONVERSATION_KEY);

export const selectConversation = createSelector(
  selectFeature,
  (state) => state.data[state.currentGroupID]?.message,
);
export const selectCurrentConversation = createSelector(
  selectFeature,
  (state) => state.data[state.currentGroupID],
);

export const selectConversationUpdatedAt = createSelector(
  selectFeature,
  (state) => state.data[state.currentGroupID]?.updatedAt,
);

export const selectCurrentConversationID = createSelector(
  selectFeature,
  (state) => state.currentGroupID,
);
