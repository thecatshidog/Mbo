import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './routes';
import './styles/app.scss';

const App = () => (
  <div>
    <Routes />
  </div>
);

export default App;

ReactDOM.render(<App />, document.getElementById('app'));
