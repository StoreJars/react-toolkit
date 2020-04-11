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
import localStorage from '../localStorage';

export const action = new Actions(namespaces.AUTH);

export const selector = createSelector(selectEntities, state => state.auth);
export const metaSelector = createSelector(selectEntitiesMeta, state => state.auth);

export const reducer = handleActions({
  [action.create.success]: (state, action$) => produce(state, draft => {
    draft = action$.payload;
    return draft;
  }),
}, { token: '' });

export const metaReducer = createMetaReducer(action);

// login a vendor, customer or admin
// creates a token
function createEpic(action$, store$) {
  return action$.pipe(
    ofType(action.create.loading),
    switchMap(({ payload }) => {
      const query = gql`mutation($input:LoginInput) {
        login(data: $input) { token }
      }`

      return api.mutate$(query, payload).pipe(
        switchMap(({ data }) => {
          localStorage.set(data.login);
          return of(action.createAction(data.login).success)
        }),
        catchError((response) => of(action.createAction(responder(response)).error)),
      );
    }),
  );
}

 function readEpic(action$) {
  return action$.pipe(
    ofType(action.read.loading),
    switchMap(({ payload }) => {
      return api.mutate$('/verify', payload).pipe(
        switchMap(({ data }) => {
          return of(action.readAction(data).success)
        }),
        catchError((response) => of(action.readAction(responder(response)).error)),
      );
    }),
  );
}

export const epic = combineEpics(readEpic, createEpic);

