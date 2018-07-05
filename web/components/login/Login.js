import React from 'react';
import PropTypes from 'prop-types';
import { firebaseConnect } from 'react-redux-firebase';
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';

class Login extends React.Component {
  constructor(props) {
    super(props);

    // Deconstruct props and state
    const { isLoaded, isEmpty, firebase, auth } = this.props;
    const { email, password } = this.state;

    this.state = {
      email: '',
      password: '',
      loading: !isLoaded,
      loggedIn: !isEmpty,
    };

    this.onEmailChange = (event) => {
      this.setState({ email: event.target.value });
    };

    this.onPasswordChange = (event) => {
      this.setState({ password: event.target.value });
    };

    this.login = (event) => {
      event.preventDefault();
      firebase.login({ email, password }).then(() => {
        this.setState({ loggedIn: true });
      });
    };

    this.loginView = () => (
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
          value={password}
          onChange={this.onPasswordChange}
        />
        <span
          className="input-group-btn">
          <button type="submit" className="btn btn-secondary">Submit</button>
        </span>
      </form>
    );

    this.signedInView = () => (
      <div>
        <p>Signed in as {auth.displayName}</p>
        <Link to="/">Go to main</Link>
      </div>
    );
  }

  render() {
    const { loading, loggedIn } = this.state;

    if (loading) return (<span>Loading...</span>);
    if (!loggedIn) return this.loginView();

    return this.signedInView();
  }
}

Login.propTypes = {
  firebase: PropTypes.shape({
    login: PropTypes.func.isRequired,
  }),
  auth: PropTypes.object,
  isLoaded: PropTypes.bool,
  isEmpty: PropTypes.bool,
};

export default compose(
  firebaseConnect(),
  connect(({ firebase: { auth } }) => { return { auth }; })
)(Login);
