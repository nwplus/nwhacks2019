const firebase = require('firebase');
// Required for side-effects
require('firebase/firestore');

const prodConfig = {
  // TODO: setup production firestore project
};

const devConfig = {
  apiKey: 'AIzaSyCBkQHeikIsiYZ2yOHiqH_mGJKDWMDU500',
  authDomain: 'nwhacks-2019.firebaseapp.com',
  databaseURL: 'https://nwhacks-2019.firebaseio.com',
  projectId: 'nwhacks-2019',
  storageBucket: 'nwhacks-2019.appspot.com',
  messagingSenderId: '98283589440',
};

const config = {
  production: prodConfig,
  development: devConfig,
};

firebase.initializeApp(config[process.env.NODE_ENV]);

const auth = firebase.auth();
const firestore = firebase.firestore();

export {
  auth,
  firestore,
};
