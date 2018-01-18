import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

const Auth = (props) => (
  <Route
    {...props}
    render={renderProps => {
      return props.user === undefined ? <Component {...renderProps} /> : <Redirect to={{ pathname: '/', state: { from: renderProps.location } }} />
    }}
  />
);

Auth.propTypes = {
  user: PropTypes.string.isRequired
}

export default Auth;

