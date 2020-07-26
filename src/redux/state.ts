import { of } from 'rxjs';
import { handleActions } from 'redux-actions';
import { produce } from 'immer';

import ActionState from './actions';

const defaultState = {
  error: false,
  loading: false,
  success: false,
};

export const initialMetaState: any = {
  create: defaultState,
  read: defaultState,
  readOne: defaultState,
  patch: defaultState,
  update: defaultState,
  delete: defaultState,
};

export const entities = (state) => state.entities;
export const entitiesMeta = (state) => state.entitiesMeta;

export function responder(response) {
  const NO_INTERNET_MESSAGE = 'No internet, please check your network connection and try again';
  return response
    ? response.data.constructor === Array
      ? response.data[0].message
      : response.data
    : NO_INTERNET_MESSAGE;
}

export function error$(action, response) {
  return of(action(responder(response)).error);
}

export function success$(action, response) {
  return of(action(response.data).success);
}

export function metaReducer(action: ActionState) {
  return handleActions(
    {
      [action.create.loading]: (state) =>
        produce(state, (draft) => {
          draft.create.loading = true;
          return draft;
        }),
      [action.create.success]: (state, action$) =>
        produce(state, (draft) => {
          draft.create.loading = false;
          draft.create.success = action$.payload;
          return draft;
        }),
      [action.create.error]: (state, action$) =>
        produce(state, (draft) => {
          draft.create.loading = false;
          draft.create.error = action$.payload;
          return draft;
        }),
      [action.create.reset]: (state) =>
        produce(state, (draft) => {
          draft.create = defaultState;
          return draft;
        }),
      [action.read.loading]: (state) =>
        produce(state, (draft) => {
          draft.read.loading = true;
          return draft;
        }),
      [action.read.success]: (state, action$) =>
        produce(state, (draft) => {
          draft.read.loading = false;
          draft.read.success = action$.payload;
          return draft;
        }),
      [action.read.error]: (state, action$) =>
        produce(state, (draft) => {
          draft.read.loading = false;
          draft.read.error = action$.payload;
          return draft;
        }),
      [action.read.reset]: (state) =>
        produce(state, (draft) => {
          draft.read = defaultState;
          return draft;
        }),
      [action.readOne.loading]: (state) =>
        produce(state, (draft) => {
          draft.readOne.loading = true;
          return draft;
        }),
      [action.readOne.success]: (state, action$) =>
        produce(state, (draft) => {
          draft.readOne.loading = false;
          draft.readOne.success = action$.payload;
          return draft;
        }),
      [action.readOne.error]: (state, action$) =>
        produce(state, (draft) => {
          draft.readOne.loading = false;
          draft.readOne.error = action$.payload;
          return draft;
        }),
      [action.readOne.reset]: (state) =>
        produce(state, (draft) => {
          draft.readOne = defaultState;
          return draft;
        }),
      [action.patch.loading]: (state) =>
        produce(state, (draft) => {
          draft.read.loading = true;
          return draft;
        }),
      [action.patch.success]: (state, action$) =>
        produce(state, (draft) => {
          draft.patch.loading = false;
          draft.patch.success = action$.payload;
          return draft;
        }),
      [action.patch.error]: (state, action$) =>
        produce(state, (draft) => {
          draft.patch.loading = false;
          draft.patch.error = action$.payload;
          return draft;
        }),
      [action.patch.reset]: (state) =>
        produce(state, (draft) => {
          draft.patch = defaultState;
          return draft;
        }),
      [action.update.loading]: (state) =>
        produce(state, (draft) => {
          draft.update.loading = true;
          return draft;
        }),
      [action.update.success]: (state, action$) =>
        produce(state, (draft) => {
          draft.update.loading = false;
          draft.update.success = action$.payload;
          return draft;
        }),
      [action.update.error]: (state, action$) =>
        produce(state, (draft) => {
          draft.update.loading = false;
          draft.update.error = action$.payload;
          return draft;
        }),
      [action.update.reset]: (state) =>
        produce(state, (draft) => {
          draft.update = defaultState;
          return draft;
        }),
      [action.delete.loading]: (state) =>
        produce(state, (draft) => {
          draft.delete.loading = true;
          return draft;
        }),
      [action.delete.success]: (state, action$) =>
        produce(state, (draft) => {
          draft.delete.loading = false;
          draft.delete.success = action$.payload;
          return draft;
        }),
      [action.delete.error]: (state, action$) =>
        produce(state, (draft) => {
          draft.delete.loading = false;
          draft.delete.error = action$.payload;
          return draft;
        }),
      [action.delete.reset]: (state) =>
        produce(state, (draft) => {
          draft.delete = defaultState;
          return draft;
        }),
    },
    initialMetaState,
  );
}

export function gqlResponder(error) {
  const SERVICE_UNAVAILABLE_MESSAGE = 'Service unavailable, please try again later';
  const UNEXPECTED_ERROR_MESSAGE = 'Please try again, an unexpected error occurred';

  try {
    const { graphQLErrors, networkError } = error;

    if (networkError) {
      console.log('Network Error', networkError);
      return SERVICE_UNAVAILABLE_MESSAGE;
    }

    if (graphQLErrors) {
      const { code, response } = graphQLErrors[0].extensions;
      console.log('GraphQL Error', response);

      if (response) {
        return response.body.data.constructor === Array ? response.body.data[0].message : response.body.data;
      } else {
        const error = code == 'ECONNREFUSED' ? SERVICE_UNAVAILABLE_MESSAGE : UNEXPECTED_ERROR_MESSAGE;
        return error;
      }
    }

    return UNEXPECTED_ERROR_MESSAGE;
  } catch (ex) {
    return ex.message;
  }
}
