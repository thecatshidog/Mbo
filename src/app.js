import './styles/app.scss';
import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import Routes from './routes'

import Hello from './components/Hello';
class App extends Component {
    constructor (props) {
        super(props)
    }
    
    render() {
        return (
            <div>
                <Hello/>
                <Routes/>
            </div>
        )
    }
}

export default App;

ReactDOM.render(<App/>, document.getElementById('app'))
