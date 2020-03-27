import { handleActions } from 'redux-actions';
import { createSelector } from 'reselect';
import { produce } from 'immer';

import { createMetaReducer, selectEntitiesMeta, selectEntities } from '../state';
import { ofType, catchError, switchMap, of } from '../operators'
import { authApi } from '../api';
import { responder } from '../helpers';
import namespaces from '../namespaces';
import Actions from '../actions';

export const action = new Actions(namespaces.VERIFY_TOKEN);

export const selector = createSelector(selectEntities, state => state.verifyToken);
export const metaSelector = createSelector(selectEntitiesMeta, state => state.verifyToken);

export const reducer = handleActions({
  [action.create.success]: (state, action$) => produce(state, draft => {
    draft = action$.payload;
    return draft;
  }),
}, { token: '' });

export const metaReducer = createMetaReducer(action);

export function epic(action$) {
  return action$
    .pipe(
      ofType(action.create.loading),
      switchMap(({ payload }) => {
        return authApi.post$('/verify', payload, payload.token)
          .pipe(
            switchMap(({ response }) => {
              return of(action.createAction(response.data).success)
            }),
            catchError(({ response }) => of(action.createAction(responder(response)).error)),
          );
      }),
    );
}

