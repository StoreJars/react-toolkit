import { handleActions } from 'redux-actions';
import { createSelector } from 'reselect';
import { produce } from 'immer';

import { createMetaReducer, selectEntitiesMeta, selectEntities } from '../state';
import { ofType, catchError, switchMap, of } from '../operators'
import Actions from '../actions'
import { authApi } from '../api';
import { responder } from '../helpers';
import namespaces from '../namespaces';
import localStorage from '../localStorage';

export const action = new Actions(namespaces.LOGIN);

export const selector = createSelector(selectEntities, state => state.login);
export const metaSelector = createSelector(selectEntitiesMeta, state => state.login);
export const createMetaSelector = createSelector(metaSelector, state => state.create);

export const reducer = handleActions({
  [action.create.success]: (state, action$) => produce(state, draft => {
    draft = action$.payload;
    return draft;
  }),
}, {});

export const metaReducer = createMetaReducer(action);

export function epic(action$, store$) {
  return action$
    .pipe(
      ofType(action.create.loading),
      switchMap(({ payload }) => {
        return authApi.post$('/login', payload, '')
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

