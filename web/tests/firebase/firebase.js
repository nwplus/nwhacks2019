const config = require('../../main.config').firebaseConfig;
const firebase = require('firebase');
// Required for side-effects
require('firebase/firestore');
firebase.initializeApp(config[process.env.NODE_ENV]);

const auth = firebase.auth();
const firestore = firebase.firestore();

export {
  auth,
  firestore,
  firebase,
};
