import { handleActions } from 'redux-actions';
import { createSelector } from 'reselect';
import { combineEpics } from 'redux-observable';
import { produce } from 'immer';

import { api } from '../api';
import { ofType, catchError, switchMap, of } from '../operators';
import { createMetaReducer, selectEntitiesMeta, selectEntities } from '../state';
import { responder, gql } from '../helpers';
import Action from '../actions';
import namespaces from '../namespaces';

export const action = new Action(namespaces.THEMES);

export const selector = createSelector(selectEntities, state => state.themes);
export const metaSelector = createSelector(selectEntitiesMeta, state => state.themes);

export const reducer = handleActions({
  [action.read.success]: (state, action$) => produce(state, draft => {
    //@ts-ignore
    draft.data = action$.payload;
    return draft
  }),
}, { data: [], item: {} });

export const metaReducer = createMetaReducer(action);

function readEpic(action$, store) {
  return action$.pipe(
    ofType(action.read.loading),
    switchMap(({ payload }) => {
      const query = gql`query{ getThemes { name class }}`;

      return api.query$(query).pipe(
        switchMap(({ data }) => {
          return of(action.readAction(data.getThemes).success)
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
      const query = gql`mutation($input: ThemeInput){
        createTheme(data: $input) { name }
      }`

      return api.mutate$(query, payload).pipe(
        switchMap(({ data }) => {
          return of(action.createAction(data.createTheme).success)
        }),
        catchError((response) => of(action.createAction(responder(response)).error)),
      );
    }),
  );
}

export const epic = combineEpics(readEpic, createEpic);
