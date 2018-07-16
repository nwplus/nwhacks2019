const exampleFunction = require('./src/example');
// const functions = require('firebase-functions');
// const admin = require('firebase-admin');

// admin.initializeApp(functions.config().firebase); 
// const database = admin.database();

exports.example = exampleFunction.handler(req, res);
