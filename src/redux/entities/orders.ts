import { handleActions } from 'redux-actions';
import { createSelector } from 'reselect';
import { produce } from 'immer';
import { combineEpics } from 'redux-observable';

import { createMetaReducer, selectEntitiesMeta, selectEntities } from '../state';
import { ofType, catchError, switchMap, of } from '../operators'
import { responder } from '../helpers';
import namespaces from '../namespaces';
import { storeApi } from '../api';
import Actions from '../actions';
import { selector as tokenSelector } from './auth';

export const action = new Actions(namespaces.ORDERS);

export const selector = createSelector(selectEntities, state => state.orders.data);
export const metaSelector = createSelector(selectEntitiesMeta, state => state.orders);
export const readMetaSelector = createSelector(metaSelector, state => state.read);

export const reducer = handleActions({
  [action.read.success]: (state, action$) => produce(state, draft => {
    draft.data.push(action$.payload);
    return draft
  }),
}, { data: [] });

export const metaReducer = createMetaReducer(action)

export function readEpic(action$, store$) {
  return action$
    .pipe(
      ofType(action.read.loading),
      switchMap(({ payload }) => {
        const { token } = tokenSelector(store$.value);

        return storeApi.get$('/orders', token)
          .pipe(
            switchMap(({ response }) => {
              return of(action.readAction(response.data).success)
            }),
            catchError(({ response }) => of(action.readAction(responder(response)).error)),
          );
      }),
    );
}

export const epic = combineEpics(readEpic);