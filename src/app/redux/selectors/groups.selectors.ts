import { createFeatureSelector, createSelector } from '@ngrx/store';
import { GROUPS_KEY, IGroupsState } from 'redux/reducers/groups.reducers';

export const selectFeature = createFeatureSelector<IGroupsState>(GROUPS_KEY);

export const selectGroups = createSelector(selectFeature, (state) => state.data);

export const selectUpdatedAt = createSelector(selectFeature, (state) => state.updatedAt);

export const selectVisitKey = createSelector(selectFeature, (state) => state.visitKey);
