import React from 'react';
import PropTypes from 'prop-types';

import { TextInput, PasswordInput } from '../../input/text';
import { PrimaryButton } from '../../input/buttons';

const Login = ({
  login,
}) => (
  <div id="login" className="fill-height flex jc-center ai-center dir-col">
    <div>
      <form
        onSubmit={login}
        className="input-group"
        name="login-form">
        <h3 className="pad-sides-xxl margin-bottom-m">Sign in</h3>
        <div className="card split flex">
          <div className="pad-ends-xxl pad-sides-xxl margin-vertical-text-inputs">
            <PrimaryButton
              text="Login"
              type="submit"
              className="fill-width"
              />
          </div>
          <div className="card-right" />
        </div>
      </form>
    </div>
  </div>
);

Login.propTypes = {
  onEmailChange: PropTypes.func.isRequired,
  onPasswordChange: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  error: PropTypes.object,
};

export default Login;
