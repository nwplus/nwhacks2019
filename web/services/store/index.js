import { createStore, combineReducers, compose } from 'redux';
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase';
import firebase from 'firebase';

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

// react-redux-firebase config
const rrfConfig = {
  // userProfile: 'users',
  // useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
};


// Initialize firebase instance
firebase.initializeApp(config[process.env.NODE_ENV]);

// Add reactReduxFirebase enhancer when making store creator
const createStoreWithFirebase =
  compose(reactReduxFirebase(firebase, rrfConfig))(createStore);
  // firebase instance as first argument

// Add firebase to reducers
const rootReducer = combineReducers({
  firebase: firebaseReducer,
});

// Create store with reducers and initial state
const initialState = {};
const store = createStoreWithFirebase(rootReducer, initialState);

export {
  initialState,
  store,
};
