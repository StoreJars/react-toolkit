import { handleActions } from 'redux-actions';
import { createSelector } from 'reselect';

import { authApi } from '../api';
import { ofType, catchError, switchMap, of } from '../operators';
import { createMetaReducer, selectEntitiesMeta, selectEntities } from '../state';
import Action from '../actions';
import { responder } from '../helpers';
import namespaces from '../namespaces';
import localStorage from '../localStorage';

export const action = new Action(namespaces.DOMAINS);

export const selector = createSelector(selectEntities, state => state.domains);
export const metaSelector = createSelector(selectEntitiesMeta, state => state.domains);

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

        return authApi.get$('/domains', token)
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

        return authApi.post$('/domains', payload, token)
          .pipe(
            switchMap(({ response }) => {
              return of(action.createAction(response.data).success)
            }),
            catchError(({ response }) => of(action.createAction(responder(response)).error)),
          );
      }),
    );
}


