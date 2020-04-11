import { handleActions } from 'redux-actions';
import { createSelector } from 'reselect';
import { combineEpics } from 'redux-observable';

import { api } from '../api';
import { ofType, catchError, switchMap, of } from '../operators';
import { createMetaReducer, selectEntitiesMeta, selectEntities } from '../state';
import { responder, gql } from '../helpers';
import Action from '../actions';
import namespaces from '../namespaces';

export const action = new Action(namespaces.VENDORS);

export const selector = createSelector(selectEntities, state => state.vendors);
export const metaSelector = createSelector(selectEntitiesMeta, state => state.vendors);

export const reducer = handleActions({
  [action.read.success]: (state, action$) => action$.payload,
}, []);

export const metaReducer = createMetaReducer(action);

function readEpic(action$, store) {
  return action$.pipe(
    ofType(action.read.loading),
    switchMap(({ payload }) => {
      const query = gql`query{ getVendors { email name }}`;

      return api.query$(query).pipe(
        switchMap(({ data }) => {
          return of(action.readAction(data.getVendors).success)
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
      const query = gql`mutation($input:VendorInput) {
        createVendor(data: $input) { token }
      }`

      return api.mutate$(query, payload).pipe(
        switchMap(({ data }) => {
          localStorage.set(data.createVendor);
          return of(action.createAction(data.createVendor).success)
        }),
        catchError((response) => {
          return of(action.createAction(responder(response)).error)
        }),
      );
    }),
  );
}

export const epic = combineEpics(readEpic, createEpic);
