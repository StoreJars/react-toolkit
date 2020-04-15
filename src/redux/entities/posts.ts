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

export const action = new Actions(namespaces.POSTS);

export const selector = createSelector(selectEntities, state => state.posts.data);
export const metaSelector = createSelector(selectEntitiesMeta, state => state.posts);
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
  return action$.pipe(
    ofType(action.read.loading),
    switchMap(({ payload }) => {
      const query = gql`query{ getPosts { email }}`;

      return api.query$(query).pipe(
        switchMap(({ data }) => {
          return of(action.readAction(data.getPosts).success)
        }),
        catchError(({ response }) => of(action.readAction(responder(response)).error)),
      );
    }),
  );
}

function createEpic(action$, store$) {
  return action$.pipe(
    ofType(action.create.loading),
    switchMap(({ payload }) => {
      const query = gql`mutation($input: PostInput){
        createPost(data: $input) { title }
      }`

      return api.mutate$(query, payload).pipe(
        switchMap(({ data }) => {
          return of(action.createAction(data.createPost).success)
        }),
        catchError((response) => of(action.createAction(responder(response)).error)),
      );
    }),
  );
}

export const epic = combineEpics(readEpic, createEpic) 