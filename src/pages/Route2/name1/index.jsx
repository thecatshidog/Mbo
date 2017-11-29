import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Draggable from '../../../components/Draggable';
import './index.scss';

class Name1 extends Component {
  static propTypes = {
    name: PropTypes.string,
  };
  static defaultProps = {
    name: 'name1'
  }

  constructor (props) {
    super(props);
    this.state = {
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      width: 100,
      height: 100,
    }
    this.onBorderDrag = this.onBorderDrag.bind(this);
    this.onBottomLeftDrag = this.onBottomLeftDrag.bind(this);
  }

  onBorderDrag( x, y ) {
    const { top, left, right, bottom } = this.state;
    const width = right - left;
    const height = bottom - top;

    this.setState( {
      top: y,
      left: x,
      bottom: y + height,
      right: x + width,
    } );
  }

  onBottomLeftDrag() {
    console.log(this.props.name)
  }

  render () {
    const { left, top, width, height } = this.state;
    return (
      <div className="name-page">
        <span>Name1</span>
        <div className="wrapper">
          <Draggable
            onDrag={this.onBorderDrag}
            onStop={this.onBottomLeftDrag}
            x={left}
            y={top}
            width={width}
            height={height}
            bounds={{
              top: 0,
              left: 0,
              bottom: 200,
              right: 200,
            }}
            className="box"
          />
        </div>
      </div>
    )
  }
}

export default Name1;
