import { handleActions } from 'redux-actions';
import { createSelector } from 'reselect';

import { createMetaReducer, selectEntitiesMeta, selectEntities } from '../state';
import { ofType, catchError, switchMap, of } from '../operators'
import Action from '../actions'
import { authApi } from '../api';
import { responder } from '../helpers';
import namespaces from '../namespaces';
import localStorage from '../localStorage';

export const action = new Action(namespaces.ADMINS);

export const selector = createSelector(selectEntities, state => state.admins);
export const metaSelector = createSelector(selectEntitiesMeta, state => state.admins);

export const reducer = handleActions({
  [action.read.success]: (state, action$) => action$.payload,
}, []);

export const metaReducer = createMetaReducer(action);

export function epic(action$, store) {
  return action$
    .pipe(
      ofType(action.read.loading),
      switchMap(({ payload }) => {
        const { token } = localStorage.get();

        return authApi.get$('/admins', token)
          .pipe(
            switchMap(({ response }) => {
              return of(action.readAction(response.data).success)
            }),
            catchError(({ response }) => of(action.readAction(responder(response)).error)),
          );
      }),
    );
}

export function epicCreate(action$, store) {
  return action$
    .pipe(
      ofType(action.create.loading),
      switchMap(({ payload }) => {
        const { token } = localStorage.get();

        return authApi.post$('/admins', payload, token)
          .pipe(
            switchMap(({ response }) => {
              return of(action.createAction(response.data).success)
            }),
            catchError(({ response }) => of(action.createAction(responder(response)).error)),
          );
      }),
    );
}


