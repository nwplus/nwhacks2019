const { db, functions } = require('../utils/firestore');
const { isEmpty } = require('../utils/helpers');

exports.submitApplicationHacker = functions.https.onRequest((request, response) => {
  response.set('Access-Control-Allow-Origin', '*');
  response.set('Access-Control-Allow-Methods', 'POST');
  response.set('Access-Control-Allow-Headers', 'Content-Type, crossDomain');

  const data = typeof request.body !== 'object' ? JSON.parse(request.body) : request.body;

  // TODO: VALIDATE DATA

  if (!isEmpty(data)) {
    db.collection('hackers').add(data)
      .then(() => response.status(200).send()) // success
      .catch((error) => {
        response.status(503).send(); // database error
      });
  } else {
    response.status(400).send(); // bad request: ignore empty requests
  }
});
