import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { firebaseConnect, firestoreConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { Logout } from '../../auth';

const AdminGate = ({ auth, firestore, children }) => {
  const {
    status: {
      requesting: {
        admins: isAdminsLoading,
      },
    },
  } = firestore;

  if (!isLoaded(auth) || isAdminsLoading) {
    return (<span>Loading...</span>);
  }

  const {
    data: {
      admins,
    },
  } = firestore;

  const { uid } = auth;
  const isAdmin = admins && uid in admins;

  if (isEmpty(auth)) {
    return (<Redirect to="/page_not_found" />);
  } if (!isAdmin) {
    return (<Logout redirect="/page_not_found" />);
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
  firestoreConnect([{ collection: 'admins' }]),
  connect((state) => {
    return {
      firestore: state.firestore,
      auth: state.firebase.auth,
    };
  }),
)(AdminGate);
