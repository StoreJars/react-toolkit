import { handleActions } from 'redux-actions';
import { createSelector } from 'reselect';

import { authApi } from '../api';
import { ofType, catchError, switchMap, of } from '../operators';
import { createMetaReducer, selectEntitiesMeta, selectEntities } from '../state';
import { responder } from '../helpers';
import Action from '../actions';
import namespaces from '../namespaces';
import localStorage from '../localStorage';

export const action = new Action(namespaces.VENDORS);

export const selector = createSelector(selectEntities, state => state.vendors);
export const metaSelector = createSelector(selectEntitiesMeta, state => state.vendors);

export function epic(action$, store) {
  return action$
    .pipe(
      ofType(action.read.loading),
      switchMap(({ payload }) => {
        const { token } = localStorage.get();

        return authApi.get$('/vendors', token)
          .pipe(
            switchMap(({ response }) => {
              return of(action.readAction(response.data).success)
            }),
            catchError(({ response }) => of(action.readAction(responder(response)).error)),
          );
      }),
    );
}

export const reducer = handleActions({
  [action.read.success]: (state, action$) => action$.payload,
}, []);

export const metaReducer = createMetaReducer(action);
