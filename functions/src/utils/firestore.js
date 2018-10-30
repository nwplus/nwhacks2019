const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

const db = admin.firestore();
db.settings({ timestampsInSnapshots: true }); // required due to future breaking changes to API

module.exports = {
  db,
  admin,
  functions,
};
