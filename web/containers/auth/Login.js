import React from 'react';
import PropTypes from 'prop-types';
import { firebaseConnect } from 'react-redux-firebase';
import { Redirect } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';

import { Login } from '../../components/auth';

class LoginContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      error: null,
    };
  }

  onEmailChange = email => this.setState({ email });

  onPasswordChange = password => this.setState({ password });

  login = (event) => {
    const { firebase } = this.props;
    const { email, password } = this.state;

    event.preventDefault();
    const credential = { email, password };
    firebase.login(credential).then(() => {
      this.setState({
        error: {},
      });
    }).catch((error) => {
      this.setState({ error });
    });
  }

  render() {
    const {
      auth: {
        isLoaded: isAuthLoaded,
        isEmpty: needLogin,
      },
      redirectUrl,
    } = this.props;

    const {
      email,
      password,
      error,
    } = this.state;

    if (!isAuthLoaded) return (<span>Loading...</span>);

    if (needLogin) {
      return (
        <Login
          onEmailChange={this.onEmailChange}
          onPasswordChange={this.onPasswordChange}
          login={this.login}
          email={email}
          password={password}
          error={error}
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
