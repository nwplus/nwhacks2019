import React from 'react';
import PropTypes from 'prop-types';
import { firebaseConnect } from 'react-redux-firebase';
import { Redirect } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';

class Login extends React.Component {
  constructor(props) {
    super(props);
    const { auth: { isLoaded, isEmpty } } = this.props;

    this.state = {
      email: '',
      password: '',
      loading: !isLoaded,
      loggedIn: !isEmpty,
      error: {},
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

  loginView() {
    const { email, password, error: { message } } = this.state;
    return (
      <div>
        <form
          onSubmit={this.login}
          className="input-group">
          <input
            placeholder="Enter your email"
            className="form-control"
            value={email}
            onChange={this.onEmailChange}
          />
          <input
            placeholder="Enter your password"
            className="form-control"
            type="password"
            value={password}
            onChange={this.onPasswordChange}
          />
          <span
            className="input-group-btn">
            <button type="submit" className="btn btn-secondary">Submit</button>
          </span>
        </form>
        <p>{ message }</p>
      </div>
    );
  }

  render() {
    const { loading, loggedIn } = this.state;

    if (loading) return (<span>Loading...</span>);
    if (!loggedIn) return this.loginView();

    return (<Redirect to="/dashboard" />);
  }
}

Login.propTypes = {
  firebase: PropTypes.shape({
    login: PropTypes.func.isRequired,
  }),
  auth: PropTypes.object,
};

export default compose(
  firebaseConnect(),
  connect(({ firebase: { auth } }) => { return { auth }; })
)(Login);
