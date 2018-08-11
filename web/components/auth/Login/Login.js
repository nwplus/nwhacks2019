import React from 'react';
import PropTypes from 'prop-types';
import { firebaseConnect } from 'react-redux-firebase';
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';

import { TextInput, PasswordInput } from '../../input/text';
import { PrimaryButton } from '../../input/buttons';
import { AfterLogin } from '../../../containers/auth';

class Login extends React.Component {
  constructor(props) {
    super(props);
    const { auth: { isLoaded, isEmpty } } = this.props;

    this.state = {
      email: '',
      password: '',
      loading: !isLoaded,
      loggedIn: !isEmpty,
      error: null,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      loading: !nextProps.auth.isLoaded,
      loggedIn: !nextProps.auth.isEmpty,
    });
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
            <h2 className="pad-sides-xxl">Sign in</h2>
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
    const { loading, loggedIn } = this.state;

    if (loading) return (<span>Loading...</span>);
    if (!loggedIn) return this.loginView();

    return (<AfterLogin />);
  }
}

Login.propTypes = {
  firebase: PropTypes.shape({
    login: PropTypes.func.isRequired,
  }),
  auth: PropTypes.object,
};

const mapStateToProps = ({ firebase: { auth } }) => {
  return { auth };
};

export default compose(
  firebaseConnect(),
  connect(mapStateToProps),
)(Login);
