export { windowExists, documentExists } from './globals';

export { default as gql } from 'graphql-tag';

export { default as TokenStorage } from './storage/TokenStorage';
export { default as CartStorage } from './storage/CartStorage';

export { entities, entitiesMeta, metaReducer as metas, responder, gqlResponder } from './redux/state';
export { default as Actions } from './redux/actions';

export { default as GraphqlApi } from './graphqlApi';
export { default as RestApi } from './restApi';

export { default as imageValidator } from './imageValidator';

export function errorParser(errors, touched, key) {
  return errors[key] && touched[key] && errors[key]
}
