import { handleActions } from 'redux-actions';
import { createSelector } from 'reselect';
import { produce } from 'immer';
import { combineEpics } from 'redux-observable';

import { createMetaReducer, selectEntitiesMeta, selectEntities } from '../state';
import { ofType, catchError, switchMap, of } from '../operators';
import { api } from '../api';
import { responder, gql } from '../helpers';
import namespaces from '../namespaces';
import Actions from '../actions';

export const action = new Actions(namespaces.TAGS);

export const selector = createSelector(selectEntities, stata => stata.tags.data);
export const metaSelector = createSelector(selectEntitiesMeta, state => state.tags);
export const createMetaSelector = createSelector(metaSelector, state => state.create);

export const reducer = handleActions({
  [action.read.success]: (state, action$) => produce(state, draft => {
    //@ts-ignore
    draft.data = action$.payload;
    return draft
  }),
}, { data: [], item: {} });

export const metaReducer = createMetaReducer(action);

function readEpic(action$, store$) {
  return action$.pipe(
    ofType(action.read.loading),
    switchMap(({ payload }) => {
      const query = gql`query{ getTags { name }}`;

      return api.query$(query).pipe(
        switchMap(({ data }) => {
          return of(action.readAction(data.getTags).success)
        }),
        catchError((response) => of(action.readAction(responder(response)).error)),
      );
    }),
  );
}

function createEpic(action$, store$) {
  return action$.pipe(
    ofType(action.create.loading),
    switchMap(({ payload }) => {
      const query = gql`mutation($input: TagInput){
        createTag(data: $input) { name }
      }`

      return api.mutate$(query, payload).pipe(
        switchMap(({ data }) => {
          return of(action.createAction(data.createTag).success)
        }),
        catchError((response) => of(action.createAction(responder(response)).error)),
      );
    }),
  );
}

export const epic = combineEpics(createEpic, readEpic) 