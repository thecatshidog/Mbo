import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { set, get } from './utils/sessionStorage';
import routerProps from '../../utils/routerProps';

import './Transtion.scss';

export default class Transition extends Component {
  static propTypes = {
    className: PropTypes.string,
    name: PropTypes.string,
    children: PropTypes.node.isRequired,
    ...routerProps,
  }

  static contextTypes = {
    changeShowChild: PropTypes.func.isRequired,
    router: PropTypes.object,
    lastChildren: PropTypes.node,
  }

  static defaultProps = {
    name: 'translate',
    className: '',
  }

  static comp;

  static locationState;
  // 添加路由记录的管理的作用主要是处理判断页面刷新还是跳转，跳转则判断是返回还是前进
  constructor(props, context) {
    super(props, context);
    const { history } = context.router;
    const historyPathObj = get('historyPathObj') || {};
    let historyPath = get('historyPath') || [];
    console.log(!historyPathObj[history.location.pathname])

    if (!get('historyPathObj') || !historyPathObj[history.location.pathname].toString()) {
      historyPathObj[history.location.pathname] = 0;
      console.log(get('historyPathObj'))
    } else {
      console.log(historyPathObj[history.location.pathname])
    }

    if (historyPathObj[history.location.pathname].toString()) {
      historyPathObj[history.location.pathname]++;
      console.log(Object.keys(get('historyPathObj')))
    }
    set('historyPathObj', historyPathObj);
    console.log(history.action);
    if (!get('historyPath') || get('historyPath') && get('historyPath').length === 0) {
      historyPath = [];
      historyPath.push(history.location.pathname);
      this.locationState = 0; // 第一次进入
    } else {
      historyPath = get('historyPath');
      if (historyPath[historyPath.length - 1] === history.location.pathname) {
        this.locationState = 3; // 刷新
      } else if (historyPath[historyPath.length - 1] !== history.location.pathname && history.action === 'PUSH') {
        historyPath.push(history.location.pathname);

        this.locationState = 1; // 前进
      } else if (history.action === 'POP' && historyPath.length > 1 && historyPath[historyPath.length - 1] !== history.location.pathname) {
        historyPath.pop();
        this.locationState = 2; // 后退
      }
    }
    set('historyPath', historyPath);
    // 初始化背景dom，但是不显示，也不添加动画效果，只将两个dom的className合并,这个不使用的时候,跳转之后，就会显示背景组件
    this.context.changeShowChild(React.cloneElement(props.children, {
      className: `${this.props.children.props.className} ${this.props.className} ${this.props.name}`,
    }), false);

    this.state = {
      animateClassName: this.props.name,
    }
  }
  /**
   * @desc 添加入场动画，记录当前的this.props.children，传递数据给Group，存储当前的
   */
  componentDidMount() {
    if (this.locationState === 3 || this.locationState === 0) {
      this.enterAnimationClass(false);
    } else {
      this.context.changeShowChild && this.enterAnimationClass(true);
    }
  }

  componentWillReceiveProps() {
    this.enterAnimationClass(false);
  }


  componentWillUnmount() {
    this.removeAnimationClass('exit');
  }
  /**
   * @desc 处理state的animation动画，给当前的children添加
   */
  enterAnimationClass(flag) {
    const { history } = this.context.router;

    if (history.action === 'PUSH' && flag) {
      this.setState({
        animateClassName: `${this.props.name}-${history.action}-now`
      }, () => {
        this.context.changeShowChild(React.cloneElement(this.props.children, {
          className: `${this.props.children.props.className} ${this.props.className} ${this.props.name}`,
        }), true);
        // this.context.changeShowChild([], true);
      })
    }
    if (history.action === 'POP' && flag) {
      this.setState({
        animateClassName: `${this.props.name}-${history.action}-now`
      }, () => {
        this.context.changeShowChild(React.cloneElement(this.props.children, {
          className: `${this.props.children.props.className} ${this.props.className} ${this.props.name}`,
        }), true);
        // this.context.changeShowChild([], true);
      })

    }
  }

  /**
   * @desc 页面离场的时候触发一次，新的页面动画结束的时候触发一次
   * @issue exit的时候，不能触发context去更新dom数据，不然会不停的触发
   */
  removeAnimationClass = (flag) => {
    if (flag === 'exit') {
      return ;
    }
    this.setState({
      animateClassName: '',
    });
    // 这里需要拷贝子组件，，但是不显示,这个地方存储的组件会被下一次使用
    if (this.context.changeShowChild) {
      this.context.changeShowChild(React.cloneElement(this.props.children, {
        className: `${this.props.children.props.className} ${this.props.className} ${this.props.name}`,
      }), false);
      // this.context.changeShowChild([], false);
    }
  }


  render() {
    return React.cloneElement(this.props.children, {
      className: `${this.props.children.props.className} ${this.props.className} ${this.state.animateClassName}`,
      onAnimationEnd: this.removeAnimationClass,
      ref: (node) => {
        if (node) {
          this.comp = node;
        }
      }
    });
  }
}
