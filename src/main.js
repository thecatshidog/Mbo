import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'core-js';
import App from './app';
import registerServiceWorker from './registerServiceWorker';
import configureStore from '@/stores/configureStore';

const store = configureStore();

const Root = () => (
  <Provider store={store}>
    <App />
  </Provider>
)


ReactDOM.render(<Root />, document.getElementById('app'));
registerServiceWorker();
