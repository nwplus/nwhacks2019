const { validate } = require('validate.js');
const { db, functions } = require('../utils/firestore');
const { validateRecaptcha } = require('../utils/recaptcha');
const { constraints, allowedFields } = require('./constraints');

// cloud function for submitting hacker application
exports.submitApplicationHacker = functions.https.onRequest((request, response) => {

  // set origin and headers to allow CORS for local testing
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
  response.set('Access-Control-Allow-Origin', '*');
  response.set('Access-Control-Allow-Headers', 'Content-Type, crossDomain');

  // this function only allows POST requests
  response.set('Access-Control-Allow-Methods', 'POST');

  // ensure request.body is an object, not a string
  let data = typeof request.body !== 'object' ? JSON.parse(request.body) : request.body;

  // only keep fields we want to write to our database
  data = validate.cleanAttributes(data, allowedFields.hacker);

  // validate data fields
  const errors = validate(data, constraints.hacker);

  // validate user's one-time recaptcha token with google servers
  //    if token verified successfully, write hacker application to firestore
  //    else return error response
  validateRecaptcha(data.recaptchaResponse, (isHuman) => {
    if (isHuman && !errors) {
      db.collection('hackers').add(data)
        .then(() => response.status(200).send()) // success
        .catch(error => response.status(503).send()); // bad request
    } else {
      response.status(400).send(); // bad request
    }
  });
});
