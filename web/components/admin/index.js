import React from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { firebaseConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';

const AdminPanel = ({ auth }) => {
  if (auth.isLoading) {
    return (<span>Loading...</span>);
  } else if (auth.isEmpty) {
    return (
      <Redirect to="/404" />
    );
  }

  return (
    <div>
      <p>{ `Admin signed in as ${auth.displayName}` }</p>
      <br />
      <Link to="/logout">logout</Link>
    </div>
  );
};

AdminPanel.propTypes = {
  auth: PropTypes.object,
};

export default compose(
  firebaseConnect(),
  connect(({ firebase: { auth } }) => { return { auth }; })
)(AdminPanel);
