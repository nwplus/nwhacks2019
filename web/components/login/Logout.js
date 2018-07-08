import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { withFirebase } from 'react-redux-firebase';
import { compose } from 'redux';
import { connect } from 'react-redux';

class Logout extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { firebase } = this.props;
    firebase.logout();
  }

  render() {
    return (<Redirect to="/" />)
  }
}

Logout.propTypes = {
  firebase: PropTypes.shape({
    logout: PropTypes.func.isRequired,
  }),
  auth: PropTypes.object,
};

export default withFirebase(Logout);
