import React from 'react';
import PropTypes from 'prop-types';

const Container = props => (
  <div className="app">
    {props.children}
  </div>
);

Container.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Container;
