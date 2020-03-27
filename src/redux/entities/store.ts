import { handleActions } from 'redux-actions';
import { createSelector } from 'reselect';
import { produce } from 'immer';

import { createMetaReducer, selectEntitiesMeta, selectEntities } from '../state';
import { ofType, catchError, switchMap, of } from '../operators';
import { authApi } from '../api';
import { responder } from '../helpers';
import Actions from '../actions';

import localStorage from '../localStorage';
import namespaces from '../namespaces';

export const action = new Actions(namespaces.STORES);

export const selector = createSelector(selectEntities, state => state.store);
export const metaSelector = createSelector(selectEntitiesMeta, state => state.store);

export const reducer = handleActions({
  [action.create.success]: (state, action$) => produce(state, draft => {
    draft = action$.payload;
    return draft;
  }),
}, { token: '' });

export const metaReducer = createMetaReducer(action);

export function epic(action$, store$) {
  const { token } = localStorage.get();

  return action$
    .pipe(
      ofType(action.create.loading),
      switchMap(({ payload }) => {
        return authApi.post$('/stores', payload, token)
          .pipe(
            switchMap(({ response }) => {
              return of(action.createAction(response.data).success)
            }),
            catchError(({ response }) => of(action.createAction(responder(response)).error)),
          );
      }),
    );
}

