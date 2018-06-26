import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { firebaseConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { connect } from 'react-redux';

class Logout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: !this.props.auth.isLoaded,
    };
  }

  componentDidMount() {
    this.props.firebase.logout();
  }

  render() {
    let message = '';

    if (this.state.loading) {
      message = 'loading....';
    } else if (this.props.auth.currentUser) {
      message = 'Something went wrong';
    } else {
      message = 'successfully logged out';
    }

    return (
      <div>
        <p>{ message }</p>
        <br />
        <Link to="/">Go to main</Link>
      </div>
    );
  }
}

Logout.propTypes = {
  firebase: PropTypes.shape({
    logout: PropTypes.func.isRequired,
  }),
  auth: PropTypes.object,
};

export default compose(
  firebaseConnect(),
  connect(({ firebase: { auth } }) => { return { auth }; })
)(Logout);
