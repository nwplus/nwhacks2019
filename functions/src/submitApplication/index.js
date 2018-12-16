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
    return response.status(400).send('Unrecognized method'); // database error
  }

  // ensure request.body is an object, not a string
  const data = typeof request.body !== 'object' ? JSON.parse(request.body) : request.body;

  // validate data fields
  const errors = validate(data, constraints.hacker);

  // store server timestamp so we can sort the applications later
  data.timestamp = Date.now();

  db.collection('feature_flags').doc('application').get().then((doc) => {
    const { enabled: isHackerApplicationEnabled } = doc.data();
    if (!isHackerApplicationEnabled) return response.status(400).send('hacker application is not enabled');

    // validate user's one-time recaptcha token with google servers
    //    if token verified successfully, write hacker application to firestore
    //    else return error response
    return validateRecaptcha(data.recaptchaResponse, (isHuman) => {
      if (!isHuman) {
        response.status(400).send('Recaptcha validation failed');
      } else if (errors) {
        response.status(400).send('Data constraint check failed');
      } else {
        // create a batch job
        const batch = db.batch();

        // create a new document reference in hacker_full_info
        // and hacker_quick_info with the same ID
        const hackerFullInfoRef = db.collection('hacker_full_info').doc();
        const hackerId = hackerFullInfoRef.id; // use same ID for all of this hacker's documents

        const hackerShortInfoRef = db.collection('hacker_short_info').doc(hackerId);
        const hackerLongInfoRef = db.collection('hacker_long_info').doc(hackerId);

        // also store the ID in a data field to make querying easier
        data.id = hackerId;

        // build hacker data object
        const hacker = Hacker(data);

        // write data fields to each document

        const errorsFull = validate(hacker.hacker_full_info, constraints.hacker_full_info);
        const errorsShort = validate(hacker.hacker_short_info, constraints.hacker_short_info);
        const errorsLong = validate(hacker.hacker_long_info, constraints.hacker_long_info);

        // validation error
        if (errorsFull || errorsShort || errorsLong) {
          response.status(500).send('Internal Server Error');
        } else {
          batch.set(hackerFullInfoRef, hacker.hacker_full_info);
          batch.set(hackerShortInfoRef, hacker.hacker_short_info);
          batch.set(hackerLongInfoRef, hacker.hacker_long_info);

          // commit the batch (either the above three documents are
          // successfully created, or not at all)
          batch.commit()
            .then(() => response.status(200).send()) // success
            .catch(() => response.status(500).send('Internal Server Error')); // database error
        }
      }
    });
  })
    .catch((e) => {
      response.status(500).send(e);
    });
});
