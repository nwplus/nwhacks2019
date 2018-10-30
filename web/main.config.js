// Configuration constants for web
require('dotenv').config({ path: '../.env' });

export const firebaseConfig = {
  production: {
    apiKey: 'AIzaSyCBkQHeikIsiYZ2yOHiqH_mGJKDWMDU500',
    authDomain: 'nwhacks-2019.firebaseapp.com',
    databaseURL: 'https://nwhacks-2019.firebaseio.com',
    projectId: 'nwhacks-2019',
    storageBucket: 'nwhacks-2019.appspot.com',
    messagingSenderId: '98283589440',
  },
  development: {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  },
};

export const recaptchaConfig = {
  production: {
    apiKey: '6LdmP3cUAAAAAPbtt6GQOq3tk-ptflXnj-RtNAHc',
  },
  development: {
    sitekey: process.env.RECAPTCHA_SITE_KEY,
  },
};

// react-redux-firebase config
export const rrfConfig = {
  // userProfile: 'users',
  // useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
};
