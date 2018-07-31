import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { withFirebase } from 'react-redux-firebase';

class Logout extends React.Component {
  componentDidMount() {
    const { firebase } = this.props;
    firebase.logout();
  }

  render() {
    return (<Redirect to="/" />);
  }
}

Logout.propTypes = {
  firebase: PropTypes.shape({
    logout: PropTypes.func.isRequired,
  }),
};

export default withFirebase(Logout);
