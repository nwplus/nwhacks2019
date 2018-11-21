import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { firebaseConnect, firestoreConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';

const AdminGate = ({ auth, firestore, children }) => {
  const { admins } = firestore.data;

  if (!isLoaded(auth) || !isLoaded(admins)) {
    return (<span>Loading...</span>);
  }

  if (isEmpty(auth) || firestore.errors.byQuery.admins) {
    return (<Redirect to="/page_not_found" />);
  }

  return (
    <div>
      {children}
    </div>
  );
};

AdminGate.propTypes = {
  auth: PropTypes.object,
  firestore: PropTypes.object,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.array,
  ]),
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
)(AdminGate);
