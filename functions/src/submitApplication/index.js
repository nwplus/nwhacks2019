const { validate } = require('validate.js');
const { db, functions } = require('../utils/firestore');
const { validateRecaptcha } = require('../utils/recaptcha');
const { constraints } = require('./constraints');
const { Hacker } = require('./models');

// cloud function for submitting hacker application
exports.submitApplicationHacker = functions.https.onRequest((request, response) => {
  // set origin and headers to allow CORS for local testing
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
  response.set('Access-Control-Allow-Origin', '*');
  response.set('Access-Control-Allow-Headers', 'Content-Type, crossDomain');

  // this function only allows POST requests
  response.set('Access-Control-Allow-Methods', 'POST');
  if (request.method !== 'POST') {
    return response.status(400).send(); // database error
  }

  // ensure request.body is an object, not a string
  const data = typeof request.body !== 'object' ? JSON.parse(request.body) : request.body;

  // validate data fields
  const errors = validate(data, constraints.hacker);

  // store server timestamp so we can sort the applications later
  data.timestamp = Date.now();

  // validate user's one-time recaptcha token with google servers
  //    if token verified successfully, write hacker application to firestore
  //    else return error response
  validateRecaptcha(data.recaptchaResponse, (isHuman) => {
    if (isHuman && !errors) {
      // create a batch job
      const batch = db.batch();

      // create a new document reference in hacker_full_info and hacker_quick_info with the same ID
      const hackerFullInfoRef = db.collection('hacker_full_info').doc();
      const hackerId = hackerFullInfoRef.id; // use same ID for all of this hacker's documents
      const hackerQuickInfoRef = db.collection('hacker_quick_info').doc(hackerId);

      // also store the ID in a data field to make querying easier
      data.id = hackerId;

      // build hacker data object
      const hacker = Hacker(data);

      // write data fields to each document
      batch.set(hackerFullInfoRef, hacker.hacker_full_info);
      batch.set(hackerQuickInfoRef, hacker.hacker_quick_info);

      // commit the batch (either the above two documents are successfully created, or not at all)
      batch.commit()
        .then(() => response.status(200).send()) // success
        .catch(() => response.status(500).send()); // database error
    } else {
      response.status(400).send(); // bad request
    }
  });
});
