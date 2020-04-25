import { of } from 'rxjs';
import { handleActions } from 'redux-actions';
import { produce } from 'immer';

import ActionState from './actions';

const defaultState = {
  error: false,
  loading: false,
  success: false,
};

export const initialMetaState = {
  create: defaultState,
  read: defaultState,
  readOne: defaultState,
  patch: defaultState,
  update: defaultState,
  delete: defaultState
};

export const selectEntities = state => state.entities;
export const selectEntitiesMeta = state => state.entitiesMeta;

export function responder(response, context = '') {
  const NO_INTERNET_MESSAGE = 'No internet, please check your network connection and try again';
  return response ? (response.data.constructor === Array ? response.data[0].message : response.data) : NO_INTERNET_MESSAGE
}

export function error$(action, response) {
  return of(action(responder(response)).error);
}

export function success$(action, response) {
  return of(action(response.data).success);
}

export function createMetaReducer(action: ActionState) {
  return (
    handleActions({
      [action.create.loading]: (state) => produce(state, draft => { draft.create.loading = true }),
      // @ts-ignore
      [action.create.success]: (state, action$) => produce(state, draft => { draft.create.loading = false, draft.create.success = action$.payload }),
      // @ts-ignore
      [action.create.error]: (state, action$) => produce(state, draft => { draft.create.loading = false, draft.create.error = action$.payload }),
      [action.create.reset]: (state) => produce(state, draft => { draft.create = defaultState }),

      [action.read.loading]: (state) => produce(state, draft => { draft.read.loading = true }),
      // @ts-ignore
      [action.read.success]: (state, action$) => produce(state, draft => { draft.read.loading = false, draft.read.success = action$.payload }),
      // @ts-ignore
      [action.read.error]: (state, action$) => produce(state, draft => { draft.read.loading = false, draft.read.error = action$.payload }),
      [action.read.reset]: (state) => produce(state, draft => { draft.read = defaultState }),

      [action.readOne.loading]: (state) => produce(state, draft => { draft.readOne.loading = true }),
      // @ts-ignore
      [action.readOne.success]: (state, action$) => produce(state, draft => { draft.readOne.loading = false, draft.readOne.success = action$.payload }),
      // @ts-ignore
      [action.readOne.error]: (state, action$) => produce(state, draft => { draft.readOne.loading = false, draft.readOne.error = action$.payload }),
      [action.readOne.reset]: (state) => produce(state, draft => { draft.readOne = defaultState }),

      [action.patch.loading]: (state) => produce(state, draft => { draft.read.loading = true }),
      // @ts-ignore
      [action.patch.success]: (state, action$) => produce(state, draft => { draft.patch.loading = false, draft.patch.success = action$.payload }),
      // @ts-ignore
      [action.patch.error]: (state, action$) => produce(state, draft => { draft.patch.loading = false, draft.patch.error = action$.payload }),
      [action.patch.reset]: (state) => produce(state, draft => { draft.patch = defaultState }),

      [action.update.loading]: (state) => produce(state, draft => { draft.update.loading = true }),
      // @ts-ignore
      [action.update.success]: (state, action$) => produce(state, draft => { draft.update.loading = false, draft.update.success = action$.payload }),
      // @ts-ignore
      [action.update.error]: (state, action$) => produce(state, draft => { draft.update.loading = false, draft.update.error = action$.payload }),
      [action.update.reset]: (state) => produce(state, draft => { draft.update = defaultState }),

      [action.delete.loading]: (state) => produce(state, draft => { draft.delete.loading = true }),
      // @ts-ignore
      [action.delete.success]: (state, action$) => produce(state, draft => { draft.delete.loading = false, draft.delete.success = action$.payload }),
      // @ts-ignore
      [action.delete.error]: (state, action$) => produce(state, draft => { draft.delete.loading = false, draft.delete.error = action$.payload }),
      [action.delete.reset]: (state) => produce(state, draft => { draft.delete = defaultState }),

    }, initialMetaState)
  );
}


