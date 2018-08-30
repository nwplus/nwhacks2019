import React from 'react';
import PropTypes from 'prop-types';
import { firebaseConnect } from 'react-redux-firebase';
import { Link, Redirect } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';

import { TextInput, PasswordInput } from '../../input/text';
import { PrimaryButton } from '../../input/buttons';
import { AfterLogin } from '../../../containers/auth';
import { getFromFirestore } from '../../../services/firestore';

class Login extends React.Component {
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

  loginView() {
    const { email, password, error } = this.state;
    return (
      <div id="login" className="fill-height flex jc-center ai-center dir-col">
        <div>
          <form
            onSubmit={this.login}
            className="input-group">
            <h3 className="pad-sides-xxl margin-bottom-m">Sign in</h3>
            <div className="card split flex">
              <div className="pad-ends-xxl pad-sides-xxl margin-vertical-text-inputs">
                <TextInput
                  placeholder="Enter your email"
                  value={email}
                  onChange={this.onEmailChange}
                  error={error}
                  label="Email"
                  id="email"
                />
                <PasswordInput
                  placeholder="Enter your password"
                  value={password}
                  onChange={this.onPasswordChange}
                  error={error}
                  label="Password"
                  id="password"
                  showErrorMessage
                  showForgot
                />
                <PrimaryButton
                  text="Submit"
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
  }

  render() {
    const {
      auth: {
        isLoaded: isAuthLoaded,
        isEmpty: needLogin,
      },
      featureFlags: {
        isLoaded: isFeatureFlagsLoaded,
      },
    } = this.props;

    if (!isAuthLoaded || !isFeatureFlagsLoaded) return (<span>Loading...</span>);

    const {
      featureFlags: {
        data: {
          application: {
            enabled: isApplicationEnabled,
          },
        },
      },
    } = this.props;

    if (!isApplicationEnabled) return (<Redirect to="/page_not_found" />);
    if (needLogin) return this.loginView();

    return (<AfterLogin />);
  }
}

Login.propTypes = {
  firebase: PropTypes.shape({
    login: PropTypes.func.isRequired,
  }),
  auth: PropTypes.object,
  featureFlags: PropTypes.object.isRequired,
};

const mapStateToProps = ({ firebase: { auth }, firestore }) => {
  const featureFlags = getFromFirestore(firestore, 'feature_flags');
  return { auth, featureFlags };
};

export default compose(
  firebaseConnect(),
  connect(mapStateToProps),
)(Login);
