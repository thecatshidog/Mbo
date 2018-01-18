import React, { Component } from 'react';
import { Transition, CSSTransition } from 'react-transition-group';
import { withRouter } from 'react-router-dom';
import './index.scss';

@withRouter
class Animation extends Component {
  constructor (props) {
    super(props)
    this.state = {
      type: true,
    }
  }
  handleClick = () => {
    this.setState({
      type: !this.state.type
    })
  }
  render() {
    return (
      <div className="animation-wrapper">
        <button onClick={this.handleClick} className="btn">点击</button>
        <Transition
          timeout={300}
          in={this.state.type}
          appear
        >
          {
            (status) => {
              return (<p className={`box fade-${status}`}>hello world</p>)}
          }
        </Transition>
        <CSSTransition
          timeout={3000}
          classNames={{
            appear: 'fade-appear',
            appearActive: 'fade-active-appear',
            enter: 'fade-enter',
            enterActive: 'fade-active-enter',
            exit: 'fade-exit',
            exitActive: 'fade-active-exit',
           }}
          in={this.state.type}
        >
          {
            () => {
              return (<p>hhhh</p>)
            }
          }
        </CSSTransition>
      </div>
    )
  }
}

export default Animation
