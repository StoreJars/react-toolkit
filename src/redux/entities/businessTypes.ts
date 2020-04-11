import { createSelector } from 'reselect';
import { handleActions } from 'redux-actions';
import { combineEpics } from 'redux-observable';

import { ofType, catchError, switchMap, of } from '../operators';
import { api } from '../api';
import { responder, gql } from '../helpers';
import { createMetaReducer, selectEntitiesMeta, selectEntities } from '../state';
import namespaces from '../namespaces';
import Actions from '../actions';

export const action = new Actions(namespaces.BUSINESS_TYPES);

export const selector = createSelector(selectEntities, state => state.businessTypes);
export const metaSelector = createSelector(selectEntitiesMeta, state => state.businessTypes);

export const reducer = handleActions({
  [action.read.success]: (state, action$) => action$.payload
}, []);

export const metaReducer = createMetaReducer(action);

function readEpic(action$, store$) {
  return action$.pipe(
    ofType(action.read.loading),
    switchMap(({ payload }) => {
      const query = gql`query{ getBusinessTypes { title description }}`;

      return api.query$(query).pipe(
        switchMap(({ data }) => {
          return of(action.readAction(data.getBusinessTypes).success)
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
      const query = gql`mutation($input: BusinessTypeInput){
          createBusinessType(data: $input) { email name }
        }`

      return api.mutate$(query, payload).pipe(
        switchMap(({ data }) => {
          return of(action.createAction(data.createBusinessType).success)
        }),
        catchError((response) => of(action.createAction(responder(response)).error)),
      );
    }),
  );
}

export const epic = combineEpics(readEpic, createEpic);
