import React from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { firebaseConnect, firestoreConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';

const AdminPanel = ({ firestore, auth }) => {
  const { admins } = firestore.data;

  if (!isLoaded(auth) || !isLoaded(admins)) {
    return (<span>Loading...</span>);
  } else if (isEmpty(auth) || firestore.errors.byQuery.admins) {
    return (<Redirect to="/page_not_found" />);
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
  firestore: PropTypes.object,
};

export default compose(
  firebaseConnect(),
  firestoreConnect(['admins']),
  connect((state) => {
    return {
      firestore: state.firestore,
      auth: state.firebase.auth,
    };
  }),
)(AdminPanel);
