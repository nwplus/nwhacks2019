import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { firebaseConnect } from 'react-redux-firebase';
import { Link } from 'react-router-dom';

// import { firebase, auth } from '../../firebase';

// const enhance = connect(
//   // Map redux state to component props
//   ({ firebase: { auth, profile } }) => ({
//     auth,
//     profile
//   })
// )

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isSignedIn: false // Local signed-in state.
    };

    const uiConfig = {
      // Popup signin flow rather than redirect flow.
      signInFlow: 'popup',
      // Redirect to /signedIn after sign in is successful.
      // Alternatively you can provide a callbacks.signInSuccess function.
      signInSuccessUrl: '/signed_in',
      signInOptions: [
        this.props.firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        this.props.firebase.auth.EmailAuthProvider.PROVIDER_ID,
      ],
      callbacks: {
        // Avoid redirects after sign-in.
        signInSuccessWithAuthResult: () => false
      }
    };

    this.login = () => {
      return (
        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={this.props.firebase.auth()} />
      );
    }

    this.signedIn = () => {
      return (
        <div>
          <p>Signed in as {this.props.firebase.auth().currentUser.displayName}</p>
          <Link to="/">Go to main</Link>
        </div>
      )
    }
  }

  // Listen to the Firebase Auth state and set the local state.
  componentDidMount() {
    this.unregisterAuthObserver = this.props.firebase.auth().onAuthStateChanged(
        (user) => this.setState({isSignedIn: !!user})
    );
  }

  // Make sure we un-register Firebase observers when the component unmounts.
  componentWillUnmount() {
    this.unregisterAuthObserver();
  }

  render() {
    // const currentUser = this.props.firebase.auth().currentUser;
    if (this.state.isSignedIn) {
      return this.signedIn();
    } else {
      return this.login();
    }
  }
}

export default firebaseConnect()(Login)
