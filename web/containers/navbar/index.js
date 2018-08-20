import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { firebaseConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { DISPLAY_TYPE } from './DisplayTypes';
import { BUTTON_TYPE } from './ButtonTypes';
import Navbar from '../../components/navbar';
import { getFromFirestore } from '../../services/firestore';

const getDisplayType = (location, featureFlags) => {
  const { pathname } = location;
  const isHomePage = pathname === '/';
  const isDashBoardPage = pathname === '/dashboard';
  const { application: { enabled: isApplicationEnabled } } = featureFlags;

  let displayType = DISPLAY_TYPE.ONLY_LOGO;

  // For demo only - todo: remove
  if (pathname === '/ui_demo') return DISPLAY_TYPE.LOGO_BUTTON_AND_LINKS;

  if (isHomePage) {
    if (isApplicationEnabled) {
      displayType = DISPLAY_TYPE.LOGO_BUTTON_AND_LINKS;
    } else {
      displayType = DISPLAY_TYPE.LOGO_AND_LINKS;
    }
  } else if (isDashBoardPage) {
    displayType = DISPLAY_TYPE.LOGO_AND_BUTTON;
  }

  return displayType;
};

const getButtonType = (signedIn, location) => {
  const { pathname } = location;
  const isHomePage = pathname === '/';
  const isDashBoardPage = pathname === '/dashboard';

  // No button on any page except home and dashboard
  if (!isHomePage && !isDashBoardPage) return BUTTON_TYPE.NONE;

  // Home page logic
  if (isHomePage) {
    // If signed in, link to dashboard page
    if (signedIn) {
      return BUTTON_TYPE.DASHBOARD;
    }
    // If not signed in, link to sign in page
    return BUTTON_TYPE.SIGN_IN;
  }

  // Always return sign out button in dashboard
  return BUTTON_TYPE.SIGN_OUT;
};

export const NavbarContainer = ({ signedIn, location, featureFlags }) => {
  const { isLoaded: isFeatureFlagLoaded, data: featureFlagsData } = featureFlags;
  if (!isFeatureFlagLoaded) return null;

  return (
    <Navbar
      displayType={getDisplayType(location, featureFlagsData)}
      buttonType={getButtonType(signedIn, location)}
      />
  );
};

NavbarContainer.propTypes = {
  signedIn: PropTypes.bool.isRequired,
  location: PropTypes.object.isRequired,
  featureFlags: PropTypes.object.isRequired,
};

export default withRouter(compose(
  firebaseConnect(),
  connect((state) => {
    const { isEmpty } = state.firebase.auth;

    const { firestore } = state;
    const featureFlags = getFromFirestore(firestore, 'feature_flags');

    return {
      signedIn: !isEmpty,
      featureFlags,
    };
  }),
)(NavbarContainer));
