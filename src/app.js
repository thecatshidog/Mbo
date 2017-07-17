import './a.scss';
import React, { Component } from 'react';
import ReactDOM from 'react-dom'

class App extends Component {
    constructor (props) {
        super(props)
        this.state = {
            a: 1
        }
    }
    
    render() {
        return (
            <h1>Hello Pig</h1>
        )
    }
}

export default App;

ReactDOM.render(<App/>, document.getElementById('app'))
