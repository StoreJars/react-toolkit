import { handleActions } from 'redux-actions';
import { createSelector } from 'reselect';
import { produce } from 'immer';
import { combineEpics } from 'redux-observable';

import { createMetaReducer, selectEntitiesMeta, selectEntities } from '../state';
import { ofType, catchError, switchMap, of } from '../operators'
import { responder, gql } from '../helpers';
import namespaces from '../namespaces';
import Actions from '../actions';
import { api } from '../api';

export const action = new Actions(namespaces.CATEGORIES);

export const selector = createSelector(selectEntities, state => state.categories);
export const metaSelector = createSelector(selectEntitiesMeta, state => state.categories);
export const readMetaSelector = createSelector(metaSelector, state => state.read);
export const createMetaSelector = createSelector(metaSelector, state => state.create);

export const reducer = handleActions({
  [action.read.success]: (state, action$) => produce(state, draft => {
    //@ts-ignore
    draft.data = action$.payload;
    return draft
  }),
}, { data: [], item: {} });

export const metaReducer = createMetaReducer(action);

function readEpic(action$, store$) {
  return action$
    .pipe(
      ofType(action.read.loading),
      switchMap(({ payload }) => {
        const query = gql`query{ getCategories { name _id}}`;

        return api.query$(query)
          .pipe(
            switchMap(({ data }) => {
              return of(action.readAction(data.getCategories).success)
            }),
            catchError((response) => of(action.readAction(responder(response)).error)),
          );
      }),
    )
    ;
}

function createEpic(action$, store$) {
  return action$
    .pipe(
      ofType(action.create.loading),
      switchMap(({ payload }) => {
        const query = gql`mutation($input: CategoryInput){
          createCategory(data: $input) {name }
        }`

        return api.mutate$(query, payload)
          .pipe(
            switchMap(({ data }) => {
              return of(action.createAction(data.createCategory).success)
            }),
            catchError((response) => of(action.createAction(responder(response)).error)),
          );
      }),
    );
}

export const epic = combineEpics(readEpic, createEpic) 