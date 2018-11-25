import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { withFirebase, firebaseConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { connect } from 'react-redux';

import purgeStore from '../../../services/store/purge';

class Logout extends React.Component {
  componentDidMount() {
    const { firebase } = this.props;
    firebase.logout();
    this.purge();
  }

  purge = () => {
    const { resetState } = this.props;
    resetState();
    purgeStore();
  }

  render() {
    const { redirect } = this.props;
    return (<Redirect to={redirect} />);
  }
}

Logout.defaultProps = {
  redirect: '/',
};

Logout.propTypes = {
  firebase: PropTypes.shape({
    logout: PropTypes.func.isRequired,
  }),
  resetState: PropTypes.func.isRequired,
  redirect: PropTypes.string,
};

const mapStateToProps = ({ firebase }) => {
  return { firebase };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // https://www.npmjs.com/package/redux-reset
    resetState: () => {
      dispatch({ type: 'RESET' });
    },
  };
};

export default compose(
  firebaseConnect(),
  connect(mapStateToProps, mapDispatchToProps),
)(withFirebase(Logout));
