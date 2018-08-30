import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { firebaseConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';

import Home from '../../components/home/Home';

const Main = ({ signedIn }) => <div><Home signedIn={signedIn} /></div>;

Main.propTypes = {
  signedIn: PropTypes.bool.isRequired,
};

export default withRouter(compose(
  firebaseConnect(),
  connect((state) => {
    const { isEmpty } = state.firebase.auth;
    return { signedIn: !isEmpty };
  }),
)(Main));
