import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import reducer from './stores/reducers';

import Routes from './routes';
import './styles/app.scss';

const middleware = [ thunk ];
if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger())
}

const store = createStore(reducer, applyMiddleware(...middleware));

const App = () => (
  <Provider store={store}>
    <Routes />
  </Provider>
);

export default App;

ReactDOM.render(<App />, document.getElementById('app'));
