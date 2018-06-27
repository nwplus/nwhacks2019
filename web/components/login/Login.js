import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { firebase, auth } from '../../firebase';

const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: 'popup',
  // Redirect to /signedIn after sign in is successful.
  // Alternatively you can provide a callbacks.signInSuccess function.
  signInSuccessUrl: '/signed_in',
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
  ],
};

export default class Login extends React.Component {
  render() {
    return (
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
    );
  }
}
