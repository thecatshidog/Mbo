import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { hot } from 'react-hot-loader';
import reducer from './stores/reducers';

import Routes from './routes';
import './styles/app.scss';


function configureStore() {
  const middlewares = [ thunk ];
  // const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
  //   shouldHotReload: false
  // }) : compose;
  if (process.env.NODE_ENV !== 'production') {
    middlewares.push(createLogger());
  }
  const store = createStore(reducer, applyMiddleware(...middlewares));
  if (process.env.NODE_ENV === 'development') {
    if (module.hot) {
      module.hot.accept('./stores/reducers', () => {
        const nextRootReducer = require('./stores/reducers');
        store.replaceReducer(nextRootReducer);
      })
    }
  }

  return store;
}


const App = () => (
  <Provider store={configureStore()}>
    <Routes />
  </Provider>
);

export default hot(module)(App);
