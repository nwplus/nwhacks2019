import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

const HackerApplication = (props) => {
  const { hackerApplication } = props;
  if (!hackerApplication.isLoaded) return (<div />);
  if (hackerApplication.data) return (<Redirect to="/dashboard" />);
  return (
    <div className="below-nav">o hello there pls apply</div>
  );
};

HackerApplication.propTypes = {
  hackerApplication: PropTypes.object.isRequired,
};

export default HackerApplication;
