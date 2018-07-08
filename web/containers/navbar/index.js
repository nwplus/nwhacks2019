import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { firebaseConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';

import Navbar from '../../components/navbar';

const NavbarContainer = ({ signedIn, location }) => {
  const { pathname } = location;
  if (pathname === '/page_not_found') return (<div />);

  const isHome = pathname === '/';
  return (
    <Navbar signedIn={signedIn} home={isHome} />
  );
};

NavbarContainer.propTypes = {
  signedIn: PropTypes.bool.isRequired,
  location: PropTypes.object,
};

export default withRouter(compose(
  firebaseConnect(),
  connect((state) => {
    const { isEmpty } = state.firebase.auth;
    return { signedIn: !isEmpty };
  }),
)(NavbarContainer));
