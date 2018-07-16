const exampleFunction = require('./src/example');
// const functions = require('firebase-functions');
// const admin = require('firebase-admin');

// admin.initializeApp(functions.config().firebase); 
// const database = admin.database();

exports.example = functions.https.onRequest((req, res) => {
    exampleFunction.handler(req, res);
});
