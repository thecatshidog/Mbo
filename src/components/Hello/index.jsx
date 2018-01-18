import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './index.scss';


class Hello extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  }
  constructor (props) {
    super(props)
    this.state = {
      a: null,
    }
  }

  render () {
    console.log(this.props.children)
    return (
      <div className="hello">
        Hello,Mbo!{this.state.a}
      </div>
    );
  }
}

export default Hello;

