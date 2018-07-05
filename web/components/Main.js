import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { firebaseConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';

const Main = ({ auth }) => {
  if (!auth.isLoaded) return (<span>Loading...</span>);

  if (auth.isEmpty) {
    return (
      <div>
        <p>not signed in - please login</p>
        <br />
        <Link to="/login">login</Link>
      </div>
    );
  }

  return (
    <div>
      <p>{ `Signed in as ${auth.displayName}` }</p>
      <br />
      <Link to="/logout">logout</Link>
    </div>
  );
};

Main.propTypes = {
  auth: PropTypes.object,
};

export default compose(
  firebaseConnect(),
  connect(({ firebase: { auth } }) => { return { auth }; })
)(Main);
