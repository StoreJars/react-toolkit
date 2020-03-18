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
  update: defaultState,
  delete: defaultState
};

// selectEntities is used by all branches inside entities so it can't be defined in ./index.js
// otherwise a circular reference is created
export const selectEntities = state => state.entities;
export const selectEntitiesMeta = state => state.entitiesMeta;

export function responder(response, context = '') {
  console.log('Error is', response, context);

  const NO_INTERNET_MESSAGE = 'No internet, please check your network connection and try again';
  return response ? (response.data.constructor === Array ? response.data[0].message : response.data) : NO_INTERNET_MESSAGE
}

export function error$(action, response) {
  // Error handler
  return of(action(responder(response)).error);
}

export function success$(action, response) {
  // Success handler
  return of(action(response.data).success);
}


export function createMetaReducer(action: ActionState) {
  return (
    handleActions({
      [action.create.loading]: (state) => produce(state, draft => { draft.create.loading = true }),
      [action.create.success]: (state, action$) => produce(state, draft => { draft.create.loading = false, draft.create.success = action$.payload }),
      [action.create.error]: (state, action$) => produce(state, draft => { draft.create.loading = false, draft.create.error = action$.payload }),
      [action.create.reset]: (state) => produce(state, draft => { draft.create = defaultState }),

      [action.read.loading]: (state) => produce(state, draft => { draft.read.loading = true }),
      [action.read.success]: (state, action$) => produce(state, draft => { draft.read.loading = false, draft.read.success = action$.payload }),
      [action.read.error]: (state, action$) => produce(state, draft => { draft.read.loading = false, draft.read.error = action$.payload }),
      [action.read.reset]: (state) => produce(state, draft => { draft.read = defaultState }),

      [action.update.loading]: (state) => produce(state, draft => { draft.update.loading = true }),
      [action.update.success]: (state, action$) => produce(state, draft => { draft.update.loading = false, draft.update.success = action$.payload }),
      [action.update.error]: (state, action$) => produce(state, draft => { draft.update.loading = false, draft.update.error = action$.payload }),
      [action.update.reset]: (state) => produce(state, draft => { draft.update = defaultState }),

      [action.delete.loading]: (state) => produce(state, draft => { draft.delete.loading = true }),
      [action.delete.success]: (state, action$) => produce(state, draft => { draft.delete.loading = false, draft.delete.success = action$.payload }),
      [action.delete.error]: (state, action$) => produce(state, draft => { draft.delete.loading = false, draft.delete.error = action$.payload }),
      [action.delete.reset]: (state) => produce(state, draft => { draft.delete = defaultState }),

    }, initialMetaState)
  );
}


