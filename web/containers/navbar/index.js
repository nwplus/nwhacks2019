import React from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';

import Navbar from '../../components/navbar';

const NavbarContainer = ({ signedIn }) => {
  return (
    <Navbar signedIn={signedIn}/>
  );
};

Navbar.propTypes = {
  isEmpty: PropTypes.bool,
};

export default compose(
  firebaseConnect(),
  connect((state) => {
    const { isEmpty } = state.firebase.auth;
    return { signedIn: !isEmpty };
  }),
)(NavbarContainer);
