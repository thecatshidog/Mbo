import React, { Component } from 'react'
import { Redirect, NavLink, Switch } from 'react-router-dom'
import RouteWithSubRoutes from '../../components/RouteWithSubRoutes/'

export default class Route2 extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    return (
      <div>
        <aside>
          <NavLink to="/route2/name1">name1</NavLink>
          <NavLink to="/route2/name2">name2</NavLink>
        </aside>
        <Switch>
          {
            this.props.routes.map((route, i) => (
              <RouteWithSubRoutes key={i} {...route}/>
            ))
          }
          <Redirect from="/route2" exact to="/route2/name1"/>
        </Switch>
      </div>
    )
  }
}
