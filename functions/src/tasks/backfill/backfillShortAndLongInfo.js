const { db, functions } = require('../../utils/firestore');

exports.backfillShortAndLongInfo = functions.https.onRequest((request, response) => {
  // set origin and headers to allow CORS for local testing
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
  response.set('Access-Control-Allow-Origin', '*');
  response.set('Access-Control-Allow-Headers', 'Content-Type, crossDomain');

  // this function only allows POST requests
  response.set('Access-Control-Allow-Methods', 'POST');

  if (request.method !== 'POST') {
    return response.status(400).send('Unrecognized method'); // database error
  }

  response.send('backfill');

  // ensure request.body is an object, not a string
  // const data = typeof request.body !== 'object' ? JSON.parse(request.body) : request.body;
});
