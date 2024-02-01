import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IProfileState, PROFILE_KEY } from 'redux/reducers/profile.reducers';

export const selectFeature = createFeatureSelector<IProfileState>(PROFILE_KEY);

export const selectProfile = createSelector(selectFeature, (state) => state.data);

export const selectProfileIsLoading = createSelector(selectFeature, (state) => state.isLoading);
