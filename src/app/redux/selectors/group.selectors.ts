import { createFeatureSelector, createSelector } from '@ngrx/store';
import { GROUP_KEY, IGroupState } from 'redux/reducers/group.reducers';

export const selectFeature = createFeatureSelector<IGroupState>(GROUP_KEY);

export const selectDialog = createSelector(
  selectFeature,
  (state) => state.data[state.currentGroupID]?.message,
);
export const selectCurrentGroup = createSelector(
  selectFeature,
  (state) => state.data[state.currentGroupID],
);

export const selectGroupUpdatedAt = createSelector(
  selectFeature,
  (state) => state.data[state.currentGroupID]?.updatedAt,
);

export const selectCurrentGroupID = createSelector(selectFeature, (state) => state.currentGroupID);
