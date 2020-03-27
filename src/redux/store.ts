import { combineReducers, createStore, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { composeWithDevTools } from 'redux-devtools-extension';

import reducers from './reducers';
import reducersMeta from './reducersMeta';

export { default as rootEpic } from './rootEpic';

const composeEnhancers = composeWithDevTools({
  // Specify name here, actionsBlacklist, actionsCreators and other options if needed
});

export const epicMiddleware = createEpicMiddleware();

const middlewares = [
  epicMiddleware,
];

const reducer = combineReducers({
  entities: reducers,
  entitiesMeta: reducersMeta,
});

export function configureStore(preloadedState) {
  return createStore(reducer, preloadedState, composeEnhancers(applyMiddleware(...middlewares)));
}

