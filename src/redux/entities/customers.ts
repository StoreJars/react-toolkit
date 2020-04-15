import { createSelector } from 'reselect';
import { handleActions } from 'redux-actions';
import { produce } from 'immer';
import { combineEpics } from 'redux-observable';

import { createMetaReducer, selectEntitiesMeta, selectEntities } from '../state';
import { ofType, catchError, switchMap, of } from '../operators';
import { api } from '../api';
import { responder, gql } from '../helpers';
import namespaces from '../namespaces';
import Actions from '../actions';
import tokenStorage from '../../storage/tokenStorage';

export const action = new Actions(namespaces.CUSTOMERS);

export const selector = createSelector(selectEntities, state => state.customers.data);
export const metaSelector = createSelector(selectEntitiesMeta, state => state.customers);
export const readMetaSelector = createSelector(metaSelector, state => state.read);

export const reducer = handleActions({
  [action.read.success]: (state, action$) => produce(state, draft => {
    //@ts-ignore
    draft.data = action$.payload;
    return draft
  }),
}, { data: [], item: {} });

export const metaReducer = createMetaReducer(action);

function readEpic(action$, store$) {
  return action$.pipe(
    ofType(action.read.loading),
    switchMap(({ payload }) => {
      const query = gql`query{ getCustomers { email name }}`;

      return api.query$(query)
        .pipe(
          switchMap(({ data }) => {
            return of(action.readAction(data.getCustomers).success)
          }),
          catchError((response) => of(action.readAction(responder(response)).error)),
        );
    }),
  );
}

function createEpic(action$, store$) {
  return action$.pipe(
    ofType(action.create.loading),
    switchMap(({ payload }) => {
      const query = gql`mutation($input:CustomerInput) {
        createCustomer(data: $input) { token name }
      }`

      return api.mutate$(query, payload).pipe(
        switchMap(({ data }) => {
          tokenStorage.set(data.createCustomer);
          return of(action.createAction(data.createCustomer).success)
        }),
        catchError((response) => {
          return of(action.createAction(responder(response)).error)
        }),
      );
    }),
  );
}

export const epic = combineEpics(readEpic, createEpic) 