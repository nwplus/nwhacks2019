const { validate } = require('validate.js');
const { db, functions } = require('../utils/firestore');
const { validateRecaptcha } = require('../utils/recaptcha');
const { constraints } = require('./constraints');
const { Volunteer } = require('./models');

// cloud function for submitting hacker application
exports.submitApplicationVolunteer = functions.https.onRequest((request, response) => {
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

  // validate user's one-time recaptcha token with google servers
  //    if token verified successfully, write hacker application to firestore
  //    else return error response
  validateRecaptcha(data.recaptchaResponse, (isHuman) => {
    if (!isHuman) {
      response.status(400).send('Recaptcha validation failed');
    } else if (errors) {
      response.status(400).send('Data constraint check failed');
    } else {
      try {
        // create a batch job
        const batch = db.batch();

        // create a new document reference in hacker_full_info
        // and hacker_quick_info with the same ID
        const volunteerFullInfoRef = db.collection('volunteer_full_info').doc();
        const volunteerId = volunteerFullInfoRef.id; // use same ID for all volunteer documents

        const volunteerShortInfoRef = db.collection('volunteer_short_info').doc(volunteerId);
        const volunteerLongInfoRef = db.collection('volunteer_long_info').doc(volunteerId);

        // also store the ID in a data field to make querying easier
        data.id = volunteerId;

        // build hacker data object
        const volunteer = Volunteer(data);

        // write data fields to each document

        const errorsFull = validate(volunteer.volunteer_full_info, constraints.volunteer_full_info);
        const errorsShort = validate(volunteer.volunteer_short_info,
          constraints.volunteer_short_info);
        const errorsLong = validate(volunteer.volunteer_long_info, constraints.volunteer_long_info);

        // validation error
        if (errorsFull || errorsShort || errorsLong) {
          response.status(500).send('Internal Server Error');
        } else {
          batch.set(volunteerFullInfoRef, volunteer.volunteer_full_info);
          batch.set(volunteerShortInfoRef, volunteer.volunteer_short_info);
          batch.set(volunteerLongInfoRef, volunteer.volunteer_long_info);

          // commit the batch (either the above three documents are
          // successfully created, or not at all)
          batch.commit()
            .then(() => response.status(200).send()) // success
            .catch(() => response.status(500).send('Internal Server Error')); // database error
        }
      } catch (e) {
        console.log(e);
        response.status(500).send('Internal Server Error');
      }
    }
  });
});
