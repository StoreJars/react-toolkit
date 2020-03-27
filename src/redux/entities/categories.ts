import { handleActions } from 'redux-actions';
import { createSelector } from 'reselect';
import { produce } from 'immer';
import { combineEpics } from 'redux-observable';

import { createMetaReducer, selectEntitiesMeta, selectEntities } from '../state';
import { ofType, catchError, switchMap, of } from '../operators'
import { responder } from '../helpers';
import namespaces from '../namespaces';
import Actions from '../actions';
import { storeApi } from '../api';
import { selector as tokenSelector } from './login';

export const action = new Actions(namespaces.CATEGORIES);

export const selector = createSelector(selectEntities, state => state.categories.data);
export const metaSelector = createSelector(selectEntitiesMeta, state => state.categories);
export const readMetaSelector = createSelector(metaSelector, state => state.read);
export const createMetaSelector = createSelector(metaSelector, state => state.create);

export const reducer = handleActions({
  [action.read.success]: (state, action$) => produce(state, draft => {
    draft.data.push(action$.payload);
    return draft
  }),
}, { data: [] });

export const metaReducer = createMetaReducer(action);

export function readEpic(action$, store$) {
  return action$
    .pipe(
      ofType(action.read.loading),
      switchMap(({ payload }) => {
        const { token } = tokenSelector(store$.value);

        return storeApi.get$('/categories', token)
          .pipe(
            switchMap(({ response }) => {
              return of(action.readAction(response.data).success)
            }),
            catchError(({ response }) => of(action.readAction(responder(response)).error)),
          );
      }),
    )
    ;
}

export function createEpic(action$, store$) {
  return action$
    .pipe(
      ofType(action.create.loading),
      switchMap(({ payload }) => {
        const { token } = tokenSelector(store$.value);

        return storeApi.post$('/categories', payload, token)
          .pipe(
            switchMap(({ response }) => {
              return of(action.createAction(response.data).success)
            }),
            catchError(({ response }) => of(action.createAction(responder(response)).error)),
          );
      }),
    );
}

export const epic = combineEpics(readEpic, createEpic) 