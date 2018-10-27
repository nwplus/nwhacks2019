import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';
import 'firebase/functions';

import { createStore, combineReducers, compose } from 'redux';
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase';
import { reduxFirestore, firestoreReducer } from 'redux-firestore';
import { persistStore, persistReducer } from 'redux-persist';
import localStorage from 'redux-persist/lib/storage';
import hardSet from 'redux-persist/lib/stateReconciler/hardSet';

import { firebaseConfig, rrfConfig } from '../../main.config';
import Reducers from '../../reducers';

import { persistConfig } from './persist.config';

export default (initialState = {}) => {
  // Pick between dev and prod firebase configurations
  const selectedFirebaseConfig = firebaseConfig[process.env.NODE_ENV];

  // Initialize firebase instance
  firebase.initializeApp(selectedFirebaseConfig);

  // Initialize Cloud Functions to firebase instance
  firebase.functions();

  firebase.nwUtils = {
    // Define a function for fetching a cloud function's URL given its name
    getFunctionUrl: (functionName) => {
      if (process.env.NODE_ENV === 'development') {
        return `http://localhost:5000/${selectedFirebaseConfig.projectId}/us-central1/${functionName}`;
      } // production
      return `https://us-central1-${selectedFirebaseConfig.projectId}.cloudfunctions.net/${functionName}`;
    },
  };

  // Initialize Cloud Firestore through Firebase
  const firestore = firebase.firestore();
  const firestoreSettings = { timestampsInSnapshots: true };
  firestore.settings(firestoreSettings);

  // Add reactReduxFirebase store enhancer when making store creator
  const createStoreWithFirebase = compose(
    reactReduxFirebase(firebase, rrfConfig),
    reduxFirestore(firebase),
  )(createStore);

  // Add firebase to reducers (uses persistReducer and hardSet)
  const rootReducer = combineReducers({
    firebase: persistReducer(
      { key: 'firepersist', storage: localStorage, stateReconciler: hardSet },
      firebaseReducer
    ),
    firestore: persistReducer(
      { key: 'firestorepersist', storage: localStorage, stateReconciler: hardSet },
      firestoreReducer
    ),
    root: persistReducer(
      { key: 'app', storage: localStorage, stateReconciler: hardSet },
      Reducers
    ),
  });

  const persistedReducer = persistReducer(persistConfig, rootReducer);
  const store = createStoreWithFirebase(persistedReducer, initialState);
  const persistor = persistStore(store);

  return { store, persistor };
};
