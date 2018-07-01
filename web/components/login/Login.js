import React from 'react';
import PropTypes from 'prop-types';
import { firebaseConnect } from 'react-redux-firebase';
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      loading: !this.props.auth.isLoaded,
      loggedIn: !this.props.auth.isEmpty,
    };

    this.onEmailChange = (event) => {
      this.setState({ email: event.target.value });
    };

    this.onPasswordChange = (event) => {
      this.setState({ password: event.target.value });
    };

    this.login = (event) => {
      event.preventDefault();
      const credential = {
        email: this.state.email,
        password: this.state.password,
      };

      this.props.firebase.login(credential).then(() => {
        this.setState({ loggedIn: true });
      }).catch((error) => {
        console.log(error);
      });
    };

    this.loginView = () => (
      <form
        onSubmit={this.login}
        className="input-group">
        <input
          placeholder="Enter your email"
          className="form-control"
          value={this.state.email}
          onChange={this.onEmailChange}
        />
        <input
          placeholder="Enter your password"
          className="form-control"
          value={this.state.password}
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
        <p>Signed in as {this.props.auth.displayName}</p>
        <Link to="/">Go to main</Link>
      </div>
    );
  }

  render() {
    if (this.state.loading) {
      return (<span>Loading...</span>);
    } else if (!this.state.loggedIn) {
      return this.loginView();
    }

    return this.signedInView();
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
