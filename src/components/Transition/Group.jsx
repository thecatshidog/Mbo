import React, { Component } from 'react';
import PropTypes from 'prop-types';


import './Group.scss';

class TransitionGroup extends Component {
  lastChildren = undefined;

  static propTypes = {
    children: PropTypes.node.isRequired,
  }

  static childContextTypes = {
    changeShowChild: PropTypes.func.isRequired,
    lastChildren: PropTypes.node.isRequired,
  }

  static contextTypes = {
    router: PropTypes.object,
  }

  constructor (props) {
    super(props);
    this.lastChildren = this.props.children;
    this.state = {
      showLastChild: false,
      lastChildren: this.lastChildren,
    }
  }

  getChildContext() {
    return {
      changeShowChild: this.changeShowChild,
      lastChildren: this.lastChildren,
    }
  }

  componentWillReceiveProps = (nextProps) => {
    console.log(this.state.lastChildren)
    console.log(nextProps)
    this.lastChildren = this.state.lastChildren;
    this.setState({
      lastChildren: nextProps.children,
    })
  }
  changeShowChild = (value, showLastChild = true) => {
    this.setState({
      showLastChild,
      lastChildren: value,
    })
  }

  render () {
    const { children } = this.props;
    return (
      <div className="group">
        {children}
        { this.state.showLastChild
          ? (
            <div className="last_child__Bg">
              {React.cloneElement(this.lastChildren, {
                className: `${this.lastChildren.props.className}-${this.context.router.history.action}-bg`
              })}
            </div>)
          : null }
      </div>
    )
  }
}

export default TransitionGroup;