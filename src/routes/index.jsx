import React from 'react';
import { Switch, BrowserRouter as Router, Redirect } from 'react-router-dom';
import RouteWithSubRoutes from '../components/RouteWithSubRoutes/';
import Route1 from '../pages/Route1/';
import Route2 from '../pages/Route2/';
import Name1 from '../pages/Route2/name1/';
import Name2 from '../pages/Route2/name2/';

const routes = [
  {
    path: '/route1',
    component: Route1,
  }, {
    path: '/route2',
    component: Route2,
    routes: [
      {
        path: '/route2/name1',
        component: Name1,
      }, {
        path: '/route2/name2',
        component: Name2,
      }
    ],
  },
];

export default () => (
  <Router>
    <Switch>
      {routes.map((route, i) => (
        <RouteWithSubRoutes key={i} {...route} />
        ))}
      <Redirect from="/" to="/route1" />
    </Switch>
  </Router>
);
