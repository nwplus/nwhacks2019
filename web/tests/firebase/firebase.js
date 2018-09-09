import firebase from 'firebase';
import 'firebase/firestore'; // required for side effects

import { firebaseConfig } from '../../main.config';

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const firestore = firebase.firestore();

export {
  auth,
  firestore,
  firebase,
};
