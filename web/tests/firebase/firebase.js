import firebase from 'firebase';
import 'firebase/firestore'; // required for side effects

import { firebaseConfig } from '../../main.config';

firebase.initializeApp(firebaseConfig[process.env.NODE_ENV]);
const auth = firebase.auth();
const firestore = firebase.firestore();

export {
  auth,
  firestore,
  firebase,
};
