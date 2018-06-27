import React from 'react';
import { firebase } from '../../firebase';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { addCurrentUser } from '../../actions';
import { Link } from 'react-router-dom';

class SignedIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  componentWillMount() {
    this.removeAuthListener = firebase.auth().onAuthStateChanged((user) => {
      this.setState({ loading: true });
      if (user) {
        this.props.addCurrentUser(user);
      } else {
        // TODO
      }
    });
  }

  render() {
    let message = '';

    if (this.props.currentUser) {
      message = `Signed in as ${this.props.currentUser.displayName}`;
    } else if (this.state.loading) {
      message = 'LOADING.......';
    } else {
      // No user is signed in.
      message = 'not signed in';
    }

    return (
      <div>
        <p>{ message }</p>
        <Link to="/">Go to main</Link>
      </div>
    );
  }

  componentWillUnmount() {
    this.removeAuthListener();
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ addCurrentUser }, dispatch);
}

function mapStateToProps({currentUser}) {
  return { currentUser };
}

export default connect(mapStateToProps, mapDispatchToProps)(SignedIn);
