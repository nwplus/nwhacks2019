import { createStore, combineReducers, compose } from 'redux';
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import { persistStore, persistReducer } from 'redux-persist';
import localStorage from 'redux-persist/lib/storage';
import hardSet from 'redux-persist/lib/stateReconciler/hardSet';

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

const persistConfig = {
  key: 'root',
  storage: localStorage,
};

export default (initialState = {}) => {
  // Initialize firebase instance
  firebase.initializeApp(config[process.env.NODE_ENV]);

  // Add reactReduxFirebase store enhancer when making store creator
  const createStoreWithFirebase =
  compose(reactReduxFirebase(firebase, rrfConfig))(createStore);

  // Add firebase to reducers (uses persistReducer and hardSet)
  const rootReducer = combineReducers({
    firebase: persistReducer(
      { key: 'firepersist', storage: localStorage, stateReconciler: hardSet },
      firebaseReducer
    ),
  });

  const persistedReducer = persistReducer(persistConfig, rootReducer);
  const store = createStoreWithFirebase(persistedReducer, initialState);
  const persistor = persistStore(store);

  return { store, persistor };
};
