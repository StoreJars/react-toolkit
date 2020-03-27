import { handleActions } from 'redux-actions';
import { createSelector } from 'reselect';
import { combineEpics } from 'redux-observable';

import { authApi } from '../api';
import { ofType, catchError, switchMap, of } from '../operators';
import { createMetaReducer, selectEntitiesMeta, selectEntities } from '../state';
import { responder } from '../helpers';
import Action from '../actions';
import namespaces from '../namespaces';
import localStorage from '../localStorage';

export const action = new Action(namespaces.PERMISSIONS);

export const selector = createSelector(selectEntities, state => state.permissions);
export const metaSelector = createSelector(selectEntitiesMeta, state => state.permissions);

export const reducer = handleActions({
  [action.create.success]: (state, action$) => action$.payload,
}, []);

export const metaReducer = createMetaReducer(action);

export function readEpic(action$, store) {
  return action$
    .pipe(
      ofType(action.read.loading),
      switchMap(({ payload }) => {
        const { token } = localStorage.get();

        return authApi.get$('/permissions', token)
          .pipe(
            switchMap(({ response }) => {
              return of(action.readAction(response.data).success)
            }),
            catchError(({ response }) => of(action.readAction(responder(response)).error)),
          );
      }),
    );
}

export function createEpic(action$, store) {
  return action$
    .pipe(
      ofType(action.create.loading),
      switchMap(({ payload }) => {
        const { token } = localStorage.get();

        return authApi.post$('/permissions', payload, token)
          .pipe(
            switchMap(({ response }) => {
              return of(action.createAction(response.data).success)
            }),
            catchError(({ response }) => of(action.createAction(responder(response)).error)),
          );
      }),
    );
}

export const epic = combineEpics(readEpic, createEpic);
