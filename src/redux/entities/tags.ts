import { handleActions } from 'redux-actions';
import { createSelector } from 'reselect';
import { produce } from 'immer';
import { combineEpics } from 'redux-observable';

import { createMetaReducer, selectEntitiesMeta, selectEntities } from '../state';
import { ofType, catchError, switchMap, of } from '../operators';
import { storeApi } from '../api';
import { responder } from '../helpers';
import namespaces from '../namespaces';
import { selector as tokenSelector } from './login';
import Actions from '../actions';

export const action = new Actions(namespaces.TAGS);

export const selector = createSelector(selectEntities, stata => stata.tags.data);
export const metaSelector = createSelector(selectEntitiesMeta, state => state.tags);
export const createMetaSelector = createSelector(metaSelector, state => state.create);

export const reducer = handleActions({
  [action.read.success]: (state, action$) => produce(state, draft => {
    draft.data.push(action$.payload);
    return draft
  }),
}, { data: [] });

export const metaReducer = createMetaReducer(action);

function readEpic(action$, store$) {
  return action$
    .pipe(
      ofType(action.read.loading),
      switchMap(({ payload }) => {
        const { token } = tokenSelector(store$.value);

        return storeApi.get$('/tags', token)
          .pipe(
            switchMap(({ response }) => {
              return of(action.readAction(response.data).success)
            }),
            catchError(({ response }) => of(action.readAction(responder(response)).error)),
          );
      }),
    );
}

function createEpic(action$, store$) {
  return action$
    .pipe(
      ofType(action.create.loading),
      switchMap(({ payload }) => {
        const token = tokenSelector(store$.value);

        return storeApi.post$('/tags', payload, token)
          .pipe(
            switchMap(({ response }) => {
              return of(action.createAction(response.data).success)
            }),
            catchError(({ response }) => of(action.createAction(responder(response)).error)),
          );
      }),
    );
}

export const epic = combineEpics(createEpic, readEpic) 