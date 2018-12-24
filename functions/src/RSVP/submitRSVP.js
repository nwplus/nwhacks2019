const { db, functions } = require('../utils/firestore');

exports.submitRSVP = functions.https.onRequest((request, response) => {
  response.set('Access-Control-Allow-Origin', '*');
  response.set('Access-Control-Allow-Headers', 'Content-Type, crossDomain');

  const id = JSON.parse(request.body).id;

  var userRef = db.collection('hacker_long_info').doc(id);
  userRef.set(JSON.parse(request.body).rsvp, { merge: true }).then(value => response.send(value)).catch(error => error);
});
