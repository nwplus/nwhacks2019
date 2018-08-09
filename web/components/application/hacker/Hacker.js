import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

const HackerApplication = (props) => {
  const { hackerApplication } = props;
  if (!hackerApplication.isLoaded) return (<div />);
  if (hackerApplication.data) return (<Redirect to="/dashboard" />);
  return (<div className="pad-nav">o hello there pls apply</div>);
};

const mapStateToProps = (state) => {
  const { root: { hackerApplication } } = state;
  return {
    hackerApplication,
  };
};

HackerApplication.propTypes = {
  hackerApplication: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(HackerApplication);
