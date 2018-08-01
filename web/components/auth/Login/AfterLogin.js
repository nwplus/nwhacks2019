import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

const AfterLogin = (props) => {
  const { isLoaded } = props;

  if (isLoaded) {
    return (<Redirect to="/dashboard" />);
  }

  return (<div />);
};

AfterLogin.propTypes = {
  isLoaded: PropTypes.bool.isRequired,
};

export default AfterLogin;
