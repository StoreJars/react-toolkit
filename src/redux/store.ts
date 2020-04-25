import { combineReducers, createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createEpicMiddleware } from 'redux-observable';

const composeEnhancers = composeWithDevTools({
  // Specify name here, actionsBlacklist, actionsCreators and other options if needed
});

export const reducer = (reducers, reducersMeta) => {
  return combineReducers({
    entities: reducers,
    entitiesMeta: reducersMeta,
  })
};

export const epicMiddleware = createEpicMiddleware();

export function configureStore(preloadedState) {
  return createStore(reducer, preloadedState, composeEnhancers(applyMiddleware(epicMiddleware)));
}

