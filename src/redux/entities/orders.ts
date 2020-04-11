import { handleActions } from 'redux-actions';
import { createSelector } from 'reselect';
import { produce } from 'immer';
import { combineEpics } from 'redux-observable';

import { createMetaReducer, selectEntitiesMeta, selectEntities } from '../state';
import { ofType, catchError, switchMap, of } from '../operators'
import { responder, gql } from '../helpers';
import namespaces from '../namespaces';
import { api } from '../api';
import Actions from '../actions';

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

function readEpic(action$, store$) {
  return action$
    .pipe(
      ofType(action.read.loading),
      switchMap(({ payload }) => {
        const query = gql`query{ getOrders { name }}`;

        return api.query$(query)
          .pipe(
            switchMap(({ data }) => {
              return of(action.readAction(data.getOrders).success)
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
      const query = gql`mutation($input: OrderInput){
        createOrder(data: $input) { name }
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