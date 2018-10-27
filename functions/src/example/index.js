const functions = require('firebase-functions');

exports.helloWorld = functions.https.onRequest((request, response) => {
  // Sets 'Access-Control-Allow-Origin' field in the response's HTTP header to match all origins
  // Enables requests originating from a local server to call this function via its HTTP endpoint
  res.set('Access-Control-Allow-Origin', '*');

  // send response
  response.send('Hello World!');
});
