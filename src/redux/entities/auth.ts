import { handleActions } from 'redux-actions';
import { createSelector } from 'reselect';
import { produce } from 'immer';
import { combineEpics } from 'redux-observable';

import { createMetaReducer, selectEntitiesMeta, selectEntities } from '../state';
import { ofType, catchError, switchMap, of } from '../operators';
import { authApi } from '../api';
import { responder } from '../helpers';
import namespaces from '../namespaces';
import localStorage from '../localStorage';
import Actions from '../actions';

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

// login eepic
export function readEpic(action$, store$) {
  return action$
    .pipe(
      ofType(action.read.loading),
      switchMap(({ payload }) => {
        return authApi.post$('/login', payload, '')
          .pipe(
            switchMap(({ response }) => {
              localStorage.set(response.data);
              return of(action.readAction(response.data).success)
            }),
            catchError(({ response }) => of(action.readAction(responder(response)).error)),
          );
      }),
    );
}

// register epic
export function createEpic(action$, store$) {
  return action$
    .pipe(
      ofType(action.create.loading),
      switchMap(({ payload }) => {
        return authApi.post$('/vendors', payload, '')
          .pipe(
            switchMap(({ response }) => {
              localStorage.set(response.data);
              return of(action.createAction(response.data).success)
            }),
            catchError(({ response }) => of(action.createAction(responder(response)).error)),
          );
      }),
    );
}

export const epic = combineEpics(readEpic, createEpic);

