import { handleActions } from 'redux-actions';
import { createSelector } from 'reselect';
import { produce } from 'immer';
import { combineEpics } from 'redux-observable';

import { createMetaReducer, selectEntitiesMeta, selectEntities } from '../state';
import { ofType, catchError, switchMap, of } from '../operators';
import { api } from '../api';
import namespaces from '../namespaces';
import { responder, gql } from '../helpers';
import Actions from '../actions';

export const action = new Actions(namespaces.PRODUCTS);

export const selector = createSelector(selectEntities, state => state.products);
export const productsSelector = createSelector(selectEntities, state => state.products.data);

export const metaSelector = createSelector(selectEntitiesMeta, state => state.products);
export const readMetaSelector = createSelector(metaSelector, state => state.read);
export const createMetaSelector = createSelector(metaSelector, state => state.create);

export const reducer = handleActions({
  [action.read.success]: (state, action$) => produce(state, draft => {
    draft.data.push(action$.payload);
    return draft
  }),
}, {
  /**
   * product data for all products, product item for single products
   * these are actually resolved from the server and passed down to the store
   */
  data: [],
  item: {}
});

export const metaReducer = createMetaReducer(action);

function readEpic(action$, store$) {
  return action$.pipe(
    ofType(action.read.loading),
    switchMap(({ payload }) => {
      const query = gql`query{ getProducts { name }}`;

      return api.query$(query).pipe(
        switchMap(({ data }) => {
          return of(action.readAction(data.getProducts).success)
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
      const query = gql`mutation($input: ProductInput){
        createProduct(data: $input) { name }
      }`;

      return api.mutate$(query, payload).pipe(
        switchMap(({ data }) => {
          return of(action.createAction(data.createProduct).success)
        }),
        catchError(({ response }) => of(action.createAction(responder(response)).error)),
      );
    }),
  );
}

export const epic = combineEpics(readEpic, createEpic);