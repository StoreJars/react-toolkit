export { windowExists, documentExists } from './globals';

export { default as gql } from 'graphql-tag';

export { default as TokenStorage } from './storage/TokenStorage';
export { default as CartStorage } from './storage/CartStorage';

export { entities, entitiesMeta, metaReducer as metas, responder } from './redux/state';

export { default as gqlResponder } from './graphqlResponder';

export { default as Actions } from './redux/actions';

export { default as GraphqlApi } from './graphqlApi';
export { default as RestApi } from './restApi';

export { default as imageValidator } from './imageValidator';

export { formatPrice, calculateTotal, resizeImage, basePath, FilterProducts, getProductId, productLink } from './utils';

export function errorParser(errors, touched, key) {
  return errors[key] && touched[key] && errors[key];
}
