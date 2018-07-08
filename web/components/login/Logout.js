import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { firebaseConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { connect } from 'react-redux';

class Logout extends React.Component {
  constructor(props) {
    super(props);
    const { auth } = this.props;

    this.state = {
      loading: !auth.isLoaded,
    };
  }

  componentDidMount() {
    const { firebase } = this.props;
    firebase.logout();
  }

  render() {
    const { loading } = this.state;
    const { auth } = this.props;
    let message = '';

    if (loading) {
      message = 'loading....';
    } else if (auth.currentUser) {
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
