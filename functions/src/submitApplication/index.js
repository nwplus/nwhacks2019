const { validate } = require('validate.js');
const { db, functions } = require('../utils/firestore');
const { constraints, allowedFields } = require('./constraints');

exports.submitApplicationHacker = functions.https.onRequest((request, response) => {
  response.set('Access-Control-Allow-Origin', '*');
  response.set('Access-Control-Allow-Methods', 'POST');
  response.set('Access-Control-Allow-Headers', 'Content-Type, crossDomain');

  let data = typeof request.body !== 'object' ? JSON.parse(request.body) : request.body;

  // only keep fields we want to write to our database
  data = validate.cleanAttributes(data, allowedFields.hacker);

  // validate data fields
  // (uncomment when all constraints are ready)
  // const errors = validate(data, constraints.hacker);

  const errors = null;

  if (!errors) {
    db.collection('hackers').add(data)
      .then(() => response.status(200).send()) // success
      .catch((error) => {
        response.status(503).send(); // database error
      });
  } else {
    response.status(400).send(); // bad request
  }
});
