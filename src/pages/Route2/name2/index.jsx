import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
// import { CSSTransition } from 'react-transition-group';
// import PropTypes from 'prop-types';
import routerProps from '../../../utils/routerProps';

import Transition from '../../../components/Transition/Transition';


import './index.scss';

export default class PWAPage extends Component {
  static propTypes = {
    ...routerProps
  };

  constructor (props) {
    super(props)
    this.state = {
      title: 'PWA',
      in: false,
    }
  }

  componentDidMount() {
    const header = document.querySelector('header');
    const menuHeader = document.querySelector('.menu__header');
    this.setState({ in: !this.state.in });
    // 监听contentLoaded事件
    document.addEventListener('DOMContentLoaded', () => {
      function updateNetworkStatus() {
        if (navigator.onLine) {
          header.classList.remove('app__offline');
          menuHeader.style.background = '#1E88E5';
        }
        else {
          this.toast('You are now offline..');
          header.classList.add('app__offline');
          menuHeader.style.background = '#9E9E9E';
        }
      }
      // 检查网络连接状态
      if (!navigator.onLine) {
        updateNetworkStatus();
      }
      window.addEventListener('online', updateNetworkStatus, false);
      window.addEventListener('offline', updateNetworkStatus, false);
    });
    this.offline();
    this.slide();
  }

  offline() {
    const menuIconElement = document.querySelector('.header__icon');
    const menuElement = document.querySelector('.menu');
    const menuOverlayElement = document.querySelector('.menu__overlay');

    let touchStartPoint;
    let touchMovePoint;

    function onTransitionEnd() {
      if (touchStartPoint < 10) {
        menuElement.style.transform = "translateX(0)";
        menuOverlayElement.classList.add('menu__overlay--show');
        menuElement.removeEventListener('transitionend', onTransitionEnd, false);
      }
    }

    function showMenu() {
      menuElement.style.transform = "translateX(0)";
      menuElement.classList.add('menu--show');
      menuOverlayElement.classList.add('menu__overlay--show');
    }

    // 隐藏菜单
    function hideMenu() {
      menuElement.style.transform = "translateX(-110%)";
      menuElement.classList.remove('menu--show');
      menuOverlayElement.classList.remove('menu__overlay--show');
      menuElement.addEventListener('transitionend', onTransitionEnd, false);
    }

    // 菜单点击事件
    menuIconElement.addEventListener('click', showMenu, false);
    menuOverlayElement.addEventListener('click', hideMenu, false);
    menuElement.addEventListener('transitionend', onTransitionEnd, false);

     // 显示菜单

    // `TouchStart` event to find where user start the touch
    document.body.addEventListener('touchstart', event => {
      touchStartPoint = event.changedTouches[0].pageX;
      touchMovePoint = touchStartPoint;
    }, false);

    // 监测用户触摸事件
    document.body.addEventListener('touchmove', event => {
      touchMovePoint = event.touches[0].pageX;
      if (touchStartPoint < 10 && touchMovePoint > 30) {
        menuElement.style.transform = "translateX(0)";
      }
    }, false);
  }

  slide() {
    const fabBtn = document.querySelector('.fab');
    fabBtn.addEventListener('click', () => {
      this.setState({
        in: !this.state.in
      })
    })
  }

  toast(msg, options) {
    const toastContainer = document.querySelector('.toast__container');

      // 显示推送消息
      if (!msg) return;

      const myoptions = options || 3000;

      const toastMsg = document.createElement('div');

      toastMsg.className = 'toast__msg';
      toastMsg.textContent = msg;

      toastContainer.appendChild(toastMsg);

      // Show toast for 3secs and hide it
      setTimeout(() => {
        toastMsg.classList.add('toast__msg--hide');
      }, myoptions);

      // 隐藏后移除dom
      toastMsg.addEventListener('transitionend', event => {
        event.target.parentNode.removeChild(event.target);
      });
  }


  render() {
    return (
      <Transition>
        <div className="PWA-page">
          <div className="app app__layout">
            <header>
              <span className="header__icon">
                <svg className="menu__icon no--select" width="24px" height="24px" viewBox="0 0 48 48" fill="#fff">
                  <path d="M6 36h36v-4H6v4zm0-10h36v-4H6v4zm0-14v4h36v-4H6z"></path>
                </svg>
              </span>
              <span className="header__title no--select">{this.state.title}</span>
            </header>
            <div className="menu">
              <div className="menu__header"></div>
              <ul className="menu__list">
                <li><NavLink to="/">Home</NavLink></li>
                <li><NavLink to="/route1">Latest</NavLink></li>
              </ul>
            </div>
            <div className="menu__overlay"></div>
            <div className="app__content">
              <section className="section">
                <button onClick={() => {
                  this.props.history.go(-1)
                }}
                >
                返回Name1
                </button>
                <p className="home-note"><Link to="/route2/name1">Name1</Link></p>
              </section>
              <div className="fab fab__push">
                <div className="fab__ripple"></div>
              </div>
              <div className="toast__container"></div>
            </div>
          </div>
        </div>
      </Transition>
    )
  }
};
