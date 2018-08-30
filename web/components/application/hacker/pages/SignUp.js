import React from 'react';
import update from 'immutability-helper';
import PropTypes from 'prop-types';

import { TextInput, PasswordInput } from '../../../input/text';
import propTypesTemplates from '../../../../prop-types-templates';

class SignUp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      password: '',
      passwordConfirmation: '',
      showError: false,
      isEmailDisabled: true,
    };
  }

  onEmailChange = (email) => {
    const { onHackerApplicationChange, hackerApplication } = this.props;
    const updatedHackerApplication = update(hackerApplication, {
      $merge: { email },
    });
    onHackerApplicationChange(updatedHackerApplication);
  }

  onPasswordChange = (password) => {
    this.setState({ password });

    const { passwordConfirmation } = this.state;
    this.updateNextButtonState(password, passwordConfirmation);
  }

  onPasswordConfirmationChange = (passwordConfirmation) => {
    this.setState({ passwordConfirmation });

    const { password } = this.state;
    this.updateNextButtonState(password, passwordConfirmation);
  }

  onPasswordConfirmationBlur = () => {
    const { showError } = this.state;

    if (!showError) {
      this.setState({ showError: true });
    }
  }

  onSideLinkClick = () => {
    const { isEmailDisabled } = this.state;
    this.setState({ isEmailDisabled: !isEmailDisabled });
  }

  getError = () => {
    const { password, passwordConfirmation } = this.state;
    const match = this.doPasswordsMatch(password, passwordConfirmation);

    if (match) {
      if (password.length === 0) {
        return { message: 'Password is empty' };
      }
      return null;
    }

    return { message: 'Passwords do not match' };
  }

  doPasswordsMatch = (password, passwordConfirmation) => (password === passwordConfirmation);

  updateNextButtonState = (password, passwordConfirmation) => {
    const match = this.doPasswordsMatch(password, passwordConfirmation);

    const enable = match && password.length > 0;
    const { updateNextButtonState } = this.props;
    updateNextButtonState(enable);
  }

  render() {
    const {
      password,
      passwordConfirmation,
      isEmailDisabled,
      showError,
    } = this.state;
    const { hackerApplication: { email } } = this.props;
    const error = this.getError();

    return (
      <div className="hacker-application-page">
        <TextInput
          label="Email"
          onChange={this.onEmailChange}
          value={email}
          id="signup-email"
          disabled={isEmailDisabled}
          sideLinkText={isEmailDisabled ? 'Edit email' : 'Save email'}
          sideLinkOnClick={this.onSideLinkClick}
          className="margin-bottom-mega"
          />
        <PasswordInput
          label="Password"
          onChange={this.onPasswordChange}
          value={password}
          id="signup-password"
          placeholder="Create a password"
          showErrorMessage={false}
          showError={showError}
          error={error}
          className="margin-bottom-mega"
          />
        <PasswordInput
          label="Password"
          onChange={this.onPasswordConfirmationChange}
          value={passwordConfirmation}
          id="signup-password-confirmation"
          placeholder="Re-enter your password"
          onBlur={this.onPasswordConfirmationBlur}
          showErrorMessage={showError}
          showError={showError}
          error={error}
          />
      </div>
    );
  }
}

SignUp.propTypes = {
  hackerApplication: propTypesTemplates.application.hacker,
  onHackerApplicationChange: PropTypes.func.isRequired,
  updateNextButtonState: PropTypes.func.isRequired,
};

export default SignUp;
