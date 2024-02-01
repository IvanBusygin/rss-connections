import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IPeopleState, PEOPLE_KEY } from 'redux/reducers/people.reducers';

export const selectFeature = createFeatureSelector<IPeopleState>(PEOPLE_KEY);

export const selectPeople = createSelector(selectFeature, (state) => state.people);

export const selectConversations = createSelector(selectFeature, (state) => state.conversations);

export const selectPeopleUpdatedAt = createSelector(selectFeature, (state) => state.updatedAt);

export const selectPeopleVisitKey = createSelector(selectFeature, (state) => state.visitKey);

export const selectPeopleVisitKey2 = createSelector(selectFeature, (state) => state.visitKey2);
