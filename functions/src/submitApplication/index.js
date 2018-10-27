const { db, functions } = require('../utils/firestore');

exports.submitApplicationHacker = functions.https.onRequest((request, response) => {
  response.set('Access-Control-Allow-Origin', '*');
  response.set('Access-Control-Allow-Methods', 'GET, POST');
  response.set('Access-Control-Allow-Headers', 'Content-Type, crossDomain');

  const { firstName, lastName } = request.body;
  response.send('beep boop');
});
