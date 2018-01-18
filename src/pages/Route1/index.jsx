import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';
import cx from 'classnames';


import Animation from 'components/Animation';
import { showLoading, getBook } from '../../stores/actions';
import './index.scss';

class Route1 extends Component {
  static propTypes = {
    // showLoading: PropTypes.func.isRequired,
    getBook: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      data: undefined,
      direction: true,
      in: true,
    }
  }
  componentDidMount() {
    this.props.getBook()
    .then((res) => {
      this.setState({
        data: res.data
      })
    })
  }
  toggleLoading = () => {
    // console.log(this.props)
    this.setState({
      loading: !this.state.loading,
      in: !this.direction,
    })
    // this.props.showLoading()
  }
  toggleEnterState = () => {
      this.setState({in: !this.state.in})
  }
  render() {
    const { direction } = this.state;
    const defaultStyle = {
        width: "100px",
        height: "100px",
        background: "red"
    }
    return (
      <div className={cx("route-page", direction)}>
        <CSSTransition in={this.state.in} timeout={500} classNames='bounceInLeft' appear>
          {(status) => {
            console.log(status)
            return(
              <div style={{
                ...defaultStyle
                }}
              >
                <ul>
                  {this.state.data && this.state.data.channels.map((item) => (
                    <li key={item.channel_id}>{item.name}</li>
                  ))}
                </ul>
                <Animation />
              </div>
          )}}
        </CSSTransition>
        <button onClick={this.toggleEnterState}>Click to Enter</button>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.Loading
  }
}

// const mapDispatchToProps = (dispatch) => {
//   return {
//     getBook: () => {
//       dispatch(getBook())
//     },
//     showLoading: () => {
//       dispatch(showLoading())
//     }
//   }
// }
const mapDispatchToProps = (dispatch) => {

  const actions = bindActionCreators({
    showLoading,
    getBook,
  }, dispatch);
  return {
    ...actions
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Route1);

