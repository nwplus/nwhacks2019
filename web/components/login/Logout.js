import React from 'react';
import { Link } from 'react-router-dom';
import { firebaseConnect } from 'react-redux-firebase';

// import { connect } from 'react-redux'
// import { bindActionCreators } from 'redux';
// import { removeCurrentUser } from '../actions';
// import { auth } from '../firebase';

class Logout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }
  //
  componentDidMount() {
    this.props.firebase.logout().then(() => {
        this.setState({ loading: false });
      });
  }
  //
  // // Make sure we un-register Firebase observers when the component unmounts.
  // componentWillUnmount() {
  //   this.unregisterAuthObserver();
  // }

  render() {
    // const logOut = () => {
    //   this.props.firebase.logout().then(() => {
    //     const currentUser = this.props.firebase.auth().currentUser
    //     this.setState({ currentUser: currentUser });
    //   });
    // }

    let message = '';

    // if (this.props.firebase.auth().currentUser) {
    //   message = `Signed in as ${this.props.firebase.auth().currentUser.displayName}`;
    // } else {
    //   message = 'not signed in - please login';
    // }

    if (this.state.loading) {
      message = 'loading....';
    } else if (this.props.firebase.auth().currentUser) {
      message = 'Something went wrong';
    } else {
      message = 'successfully logged out';
    }

    return (
      <div>
        <p>{ message }</p>
        <br></br>
        <Link to="/">Go to main</Link>
      </div>
    );
  }
}

export default firebaseConnect()(Logout)
