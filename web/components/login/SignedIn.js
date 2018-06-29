import React from 'react';
import { firebase } from '../../firebase';

export default class SignedIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
    };
  }

  componentWillMount() {
    this.removeAuthListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
      }
    });
  }

  render() {
    let message = '';

    if (this.state.user) {
      // User is signed in.
      message = `Signed in as ${this.state.user.displayName}`;
    } else {
      // No user is signed in.
      message = 'something went wrong';
    }

    return (
      <div>
        <p>{message}</p>
      </div>
    );
  }
}
