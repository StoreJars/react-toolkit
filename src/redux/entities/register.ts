import { handleActions } from 'redux-actions';
import { createSelector } from 'reselect';
import { produce } from 'immer';

import { createMetaReducer, selectEntitiesMeta, selectEntities } from '../state';
import { ofType, catchError, switchMap, of } from '../operators';
import { authApi } from '../api';
import { responder } from '../helpers';
import namespaces from '../namespaces';
import localStorage from '../localStorage';
import Actions from '../actions';

export const action = new Actions(namespaces.REGISTER);

export const selector = createSelector(selectEntities, state => state.register);
export const metaSelector = createSelector(selectEntitiesMeta, state => state.register);

export const reducer = handleActions({
  [action.create.success]: (state, action$) => produce(state, draft => {
    draft = action$.payload;
    return draft;
  }),
}, { token: '' });

export const metaReducer = createMetaReducer(action);

export function epic(action$, store$) {
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
