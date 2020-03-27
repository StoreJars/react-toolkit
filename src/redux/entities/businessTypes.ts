import { createSelector } from 'reselect';
import { handleActions } from 'redux-actions';

import { ofType, catchError, switchMap, of } from '../operators';
import { authApi } from '../api';
import { responder } from '../helpers';
import { createMetaReducer, selectEntitiesMeta, selectEntities } from '../state';
import namespaces from '../namespaces';
import Actions from '../actions';
import localStorage from '../localStorage';

export const action = new Actions(namespaces.BUSINESS_TYPES);

export const selector = createSelector(selectEntities, state => state.businessTypes);
export const metaSelector = createSelector(selectEntitiesMeta, state => state.businessTypes);

export const reducer = handleActions({
  [action.read.success]: (state, action$) => action$.payload
}, []);

export const metaReducer = createMetaReducer(action);

export function epic(action$, store$) {
  return action$
    .pipe(
      ofType(action.read.loading),
      switchMap(({ payload }) => {
        const { token } = localStorage.get();

        return authApi.get$('/business-types', token)
          .pipe(
            switchMap(({ response }) => {
              return of(action.readAction(response.data).success)
            }),
            catchError(({ response }) => of(action.readAction(responder(response)).error)),
          );
      }),
    );
}

export function epicCreate(action$, store$) {
  return action$
    .pipe(
      ofType(action.create.loading),
      switchMap(({ payload }) => {
        const { token } = localStorage.get();

        return authApi.post$('/business-types', payload, token)
          .pipe(
            switchMap(({ response }) => {
              return of(action.createAction(response.data).success)
            }),
            catchError(({ response }) => of(action.createAction(responder(response)).error)),
          );
      }),
    );
}
