import React from 'react';
import PropTypes from 'prop-types';
import { firebaseConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Login } from '../../../components/auth';

export class LoginContainer extends React.Component {
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

  onEmailChange = event => this.setState({ email: event.target.value });

  onPasswordChange = event => this.setState({ password: event.target.value });

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
      loading,
      loggedIn,
      email,
      password,
      error,
    } = this.state;

    return (
      <Login
        loading={loading}
        loggedIn={loggedIn}
        email={email}
        password={password}
        error={error}
        login={this.login}
        onEmailChange={this.onEmailChange}
        onPasswordChange={this.onPasswordChange}
        />
    );
  }
}

LoginContainer.propTypes = {
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
)(LoginContainer);
