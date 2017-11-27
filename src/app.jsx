import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './routes';
import './styles/app.scss';

import Hello from './components/Hello';

const App = () => (
  <div>
    <Hello />
    <Routes />
  </div>
);

export default App;

ReactDOM.render(<App />, document.getElementById('app'));
