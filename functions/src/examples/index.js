const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

const db = admin.firestore();

// required due to future breaking changes to API
db.settings({ timestampsInSnapshots: true });

exports.helloWorld = functions.https.onRequest((request, response) => {
  // Sets 'Access-Control-Allow-Origin' field in the response's HTTP header to match all origins
  // Enables requests originating from a local server to call this function via its HTTP endpoint
  response.set('Access-Control-Allow-Origin', '*');

  // send response
  response.send('Hello World!');
});

// https://firebase.google.com/docs/firestore/query-data/get-data
exports.getData = functions.https.onRequest((request, response) => {
  response.set('Access-Control-Allow-Origin', '*');
  const testRef = db.collection('testing').doc('example');
  const getDoc = testRef.get()
    .then((doc) => {
      if (!doc.exists) {
        console.log('no such doc');
        return 'No such document!';
      }
      console.log(doc);
      return JSON.stringify(doc.data());
    });
  getDoc.then(value => response.send(value)).catch(error => error);
});
