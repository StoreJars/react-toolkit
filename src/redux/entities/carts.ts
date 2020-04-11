import { handleActions } from 'redux-actions';
import { createSelector } from 'reselect';
import { produce } from 'immer';
import { combineEpics } from 'redux-observable';

import { createMetaReducer, selectEntitiesMeta, selectEntities } from '../state';
import { ofType, catchError, switchMap, of } from '../operators';
import { responder } from '../helpers';
import { cartStorage } from '../localStorage';
import { api } from '../api';
import Actions from '../actions';
import namespaces from '../namespaces';
import { selector as tokenSelector } from './auth';

export const action = new Actions(namespaces.CARTS);

export const selector = createSelector(selectEntities, state => state.carts);
export const metaSelector = createSelector(selectEntitiesMeta, state => state.carts);

export const reducer = handleActions({
  [action.read.success]: (state, action$) => produce(state, draft => {
    draft.data.push(action$.payload);
    return draft;
  }),
  [action.update.success]: (state, action$) => produce(state, draft => {
    let quantity = 1;
    const { payload } = action$;
    const { items } = draft

    /**
     * go through the cart
     * once you find the item
     * update the quantity
     * insert the update item in place back into the cart
     */

    if (state.items.length < 1) {
      // @ts-ignore
      payload.quantity = quantity;
      draft.items.push(payload);
      cartStorage.set(draft.items);
      // push into the cart
      return draft;
    } else {
      let found = false;
      // check if the item is in the cart
      for (let i = 0; i < items.length; i++) {
        // @ts-ignore
        if (items[i]._id == payload._id) {
          draft.items[i].quantity = items[i].quantity + 1;
          found = true;
          cartStorage.set(draft.items);
          return draft;
        }
      }

      if (!found) {
        // @ts-ignore
        payload.quantity = quantity;
        draft.items.push(payload);
        // push into the cart
        // persist to local storage
        cartStorage.set(draft.items);
        return draft;
      }

      // return draft as is if no changes were made
      return draft;
    }
  }),

}, { data: [], items: [] });

export const metaReducer = createMetaReducer(action);

function readEpic(action$, store$) {
  return action$
    .pipe(
      ofType(action.read.loading),
      switchMap(({ payload }) => {
        return api.query$('/carts')
          .pipe(
            switchMap(({ data }) => {
              return of(action.createAction(data).success)
            }),
            catchError((response) => of(action.createAction(responder(response)).error)),
          );
      }),
    );
}

// this handles add to cart actions
function updateEpic(action$, store$) {
  return action$
    .pipe(
      ofType(action.update.loading),
      switchMap(({ payload }) => {
        // validate payload to contain scretin  keys, use yup anc catch error adn emit
        return of(action.updateAction(payload).success)

      }),
      catchError((response) => of(action.updateAction(responder(response)).error)),
    );
}

export const epic = combineEpics(readEpic, updateEpic) 