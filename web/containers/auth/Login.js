import React from 'react';
import PropTypes from 'prop-types';
import { firebaseConnect } from 'react-redux-firebase';
import { Redirect } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';

import { Login } from '../../components/auth';

class LoginContainer extends React.Component {
  login = (event) => {
    const { firebase } = this.props;
    event.preventDefault();
    firebase.login({ provider: 'google', type: 'popup' });
  }

  render() {
    const {
      auth: {
        isLoaded: isAuthLoaded,
        isEmpty: needLogin,
      },
      redirectUrl,
    } = this.props;

    if (!isAuthLoaded) return (<span>Loading...</span>);

    if (needLogin) {
      return (
        <Login
          login={this.login}
        />
      );
    }

    return (<Redirect to={redirectUrl} />);
  }
}

LoginContainer.propTypes = {
  firebase: PropTypes.shape({
    login: PropTypes.func.isRequired,
  }),
  auth: PropTypes.object,
  redirectUrl: PropTypes.string.isRequired,
};

const mapStateToProps = ({ firebase: { auth } }) => {
  return { auth };
};

export default compose(
  firebaseConnect(),
  connect(mapStateToProps),
)(LoginContainer);
