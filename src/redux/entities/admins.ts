import { handleActions } from 'redux-actions';
import { createSelector } from 'reselect';
import { combineEpics } from 'redux-observable';
import { produce } from 'immer';

import { createMetaReducer, selectEntitiesMeta, selectEntities } from '../state';
import { ofType, catchError, switchMap, of } from '../operators'
import Action from '../actions'
import { api } from '../api';
import { responder, gql } from '../helpers';
import namespaces from '../namespaces';

export const action = new Action(namespaces.ADMINS);

export const selector = createSelector(selectEntities, state => state.admins);
export const metaSelector = createSelector(selectEntitiesMeta, state => state.admins);

export const reducer = handleActions({
  [action.read.success]: (state, action$) => produce(state, draft => {
    // @ts-ignore
    draft.data = action$.payload;
    return draft
  }),
}, { data: [], item: {} });

export const metaReducer = createMetaReducer(action);

function readEpic(action$, store) {
  return action$.pipe(
    ofType(action.read.loading),
    switchMap(({ payload }) => {
      const query = gql`query{ getAdmins { email name}}`;

      return api.query$(query).pipe(
        switchMap(({ data }) => {
          return of(action.readAction(data.getAdmins).success)
        }),
        catchError((response) => of(action.readAction(responder(response)).error)),
      );
    }),
  );
}

function createEpic(action$, store) {
  return action$.pipe(
    ofType(action.create.loading),
    switchMap(({ payload }) => {
      const query = gql`mutation($input: AdminInput){
        createAdmin(data: $input) { email }
      }`

      return api.mutate$(query, payload).pipe(
        switchMap(({ data }) => {
          return of(action.createAction(data.createAdmin).success)
        }),
        catchError((response) => of(action.createAction(responder(response)).error)),
      );
    }),
  );
}

export const epic = combineEpics(readEpic, createEpic);
