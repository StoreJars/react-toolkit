import { handleActions } from 'redux-actions';
import { createSelector } from 'reselect';
import { combineEpics } from 'redux-observable';

import { api } from '../api';
import { ofType, catchError, switchMap, of } from '../operators';
import { createMetaReducer, selectEntitiesMeta, selectEntities } from '../state';
import Action from '../actions';
import { responder, gql } from '../helpers';
import namespaces from '../namespaces';

export const action = new Action(namespaces.DOMAINS);

export const selector = createSelector(selectEntities, state => state.domains);
export const metaSelector = createSelector(selectEntitiesMeta, state => state.domains);

export const reducer = handleActions({
  [action.read.success]: (state, action$) => action$.payload,
}, []);

export const metaReducer = createMetaReducer(action);

function readEpic(action$, store) {
  return action$.pipe(
    ofType(action.read.loading),
    switchMap(({ payload }) => {
      const query = gql`query{ getDomains { name url }}`;

      return api.query$(query).pipe(
        switchMap(({ data }) => {
          return of(action.readAction(data.getDomains).success)
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
      const query = gql`mutation($input: DomainInput){
          createDomain(data: $input) { name }
      }`

      return api.mutate$(query, payload).pipe(
        switchMap(({ data }) => {
          return of(action.createAction(data.createDomain).success)
        }),
        catchError((response) => of(action.createAction(responder(response)).error)),
      );
    }),
  );
}

export const epic = combineEpics(readEpic, createEpic);


