import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';

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
  // Initialize firebase instance
  firebase.initializeApp(firebaseConfig[process.env.NODE_ENV]);
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
    firestore: firestoreReducer,
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
