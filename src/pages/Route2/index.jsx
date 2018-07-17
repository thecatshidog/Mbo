import React, { Component } from 'react';
import { Redirect, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import TransitionGroup from '../../components/Transition/Group';
import RouteWithSubRoutes from '../../components/RouteWithSubRoutes/';
import './index.scss';

export default class Route2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
  }

  render() {
    return (
      <TransitionGroup>
        <Switch>
          {
            this.props.routes.map((route, i) => (
              <RouteWithSubRoutes key={i} {...route} />
            ))
          }
          <Redirect from="/route2" exact to="/route2/name1" />
        </Switch>
      </TransitionGroup>
    );
  }
}

Route2.propTypes = {
  routes: PropTypes.arrayOf(PropTypes.shape({
    path: PropTypes.string,
    component: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
    routes: PropTypes.any,
  })).isRequired,
};
