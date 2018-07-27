import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { TextInput, PasswordInput } from '../../input/text';
import { PrimaryButton } from '../../input/buttons';
import AfterLogin from '../../../containers/auth/Login/AfterLogin';

const Login = (props) => {
  const {
    loading,
    loggedIn,
    email,
    password,
    error,
    onEmailChange,
    onPasswordChange,
    login,
  } = props;

  if (loading) {
    return (<div />);
  }

  if (loggedIn) {
    return (<AfterLogin />);
  }

  return (
    <div id="login">
      <div>
        <form
          onSubmit={login}
          className="input-group">
          <span>Sign in</span>
          <div className="card">
            <div className="card-left">
              <TextInput
                placeholder="Enter your email"
                value={email}
                onChange={onEmailChange}
                error={error}
                label="Email"
                id="email"
              />
              <PasswordInput
                placeholder="Enter your password"
                value={password}
                onChange={onPasswordChange}
                error={error}
                label="Password"
                id="password"
                showErrorMessage
              />
              <PrimaryButton
                text="Submit"
                />
              <p>
                Don&apos;t have an account yet?&nbsp;
                <Link to="/">Apply here</Link>
              </p>
            </div>
            <div className="card-right" />
          </div>
        </form>
      </div>
    </div>
  );
};

Login.propTypes = {
  loading: PropTypes.bool.isRequired,
  loggedIn: PropTypes.bool.isRequired,
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  error: PropTypes.object,
  onEmailChange: PropTypes.func.isRequired,
  onPasswordChange: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
};

export default Login;
