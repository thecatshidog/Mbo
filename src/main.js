import React from 'react';
import ReactDOM from 'react-dom';
import 'core-js';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('app'));
registerServiceWorker();
