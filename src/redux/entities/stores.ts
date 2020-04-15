import { handleActions } from 'redux-actions';
import { createSelector } from 'reselect';
import { produce } from 'immer';
import { combineEpics } from 'redux-observable';

import { createMetaReducer, selectEntitiesMeta, selectEntities } from '../state';
import { ofType, catchError, switchMap, of } from '../operators';
import { api } from '../api';
import { responder, gql } from '../helpers';
import Actions from '../actions';
import namespaces from '../namespaces';

export const action = new Actions(namespaces.STORES);

export const selector = createSelector(selectEntities, state => state.store);
export const metaSelector = createSelector(selectEntitiesMeta, state => state.store);

export const reducer = handleActions({
  [action.create.success]: (state, action$) => produce(state, draft => {
    //@ts-ignore
    draft.token = action$.payload;
    return draft;
  }),
  [action.read.success]: (state, action$) => produce(state, draft => {
    //@ts-ignore
    draft.data = action$.payload;
    return draft;
  }),
}, { data: [], item: {}, token: '' });

export const metaReducer = createMetaReducer(action);

function readEpic(action$) {
  return action$.pipe(
    ofType(action.read.loading),
    switchMap(({ payload }) => {
      const query = gql`query{ getStores { name }}`;

      return api.query$(query).pipe(
        switchMap(({ data }) => {
          return of(action.readAction(data.getStores).success)
        }),
        catchError((response) => of(action.readAction(responder(response)).error)),
      );
    }),
  );
}

function createEpic(action$) {
  return action$.pipe(
    ofType(action.create.loading),
    switchMap(({ payload }) => {
      const query = gql`mutation($input:StoreInput) {
        createStore(data: $input) { token }
      }`

      return api.mutate$(query, payload).pipe(
        switchMap(({ data }) => {
          return of(action.createAction(data.createStore).success)
        }),
        catchError((response) => of(action.createAction(responder(response)).error)),
      );
    }),
  );
}

export const epic = combineEpics(readEpic, createEpic);
