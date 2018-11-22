import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { TextInput, PasswordInput } from '../../input/text';
import { PrimaryButton } from '../../input/buttons';

const Login = ({
  onEmailChange,
  onPasswordChange,
  login,
  email,
  password,
  error
}) => {
  return (
    <div id="login" className="fill-height flex jc-center ai-center dir-col">
      <div>
        <form
          onSubmit={login}
          className="input-group"
          name="login-form">
          <h3 className="pad-sides-xxl margin-bottom-m">Sign in</h3>
          <div className="card split flex">
            <div className="pad-ends-xxl pad-sides-xxl margin-vertical-text-inputs">
              <TextInput
                placeholder="Enter your email"
                value={email}
                onChange={onEmailChange}
                error={error}
                label="Email"
                name="email"
              />
              <PasswordInput
                placeholder="Enter your password"
                value={password}
                onChange={onPasswordChange}
                error={error}
                label="Password"
                name="password"
                showErrorMessage
                showForgot
              />
              <PrimaryButton
                text="Submit"
                type="submit"
                className="fill-width"
              />
              <p className="flex jc-center">
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

export default Login;
