const { db, functions, admin } = require('../utils/firestore');

// cloud function for submitting hacker application
exports.importMentors = functions.https.onRequest((request, response) => {
  // set origin and headers to allow CORS for local testing
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
  response.set('Access-Control-Allow-Origin', '*');
  response.set('Access-Control-Allow-Headers', 'Content-Type, crossDomain');
  response.set('Access-Control-Allow-Credentials', 'true');
  response.set('Access-Control-Allow-Methods', 'POST');

  if (request.method === 'OPTIONS') {
    // Send response to OPTIONS requests
    response.set('Access-Control-Allow-Headers', 'Authorization');
    response.set('Access-Control-Max-Age', '3600');
    return response.status(204).send('');
  }

  if (request.method !== 'POST') {
    return response.status(400).send('Unrecognized method'); // database error
  }

  // ensure request.body is an object, not a string
  const data = typeof request.body !== 'object' ? JSON.parse(request.body) : request.body;

  const clientToken = request.header('Authorization');

  return admin.auth().verifyIdToken(clientToken).then((decodedToken) => {
    const { uid } = decodedToken;
    return db.collection('admins').doc(uid).get();
  }).then((adminDoc) => {
    if (!adminDoc) {
      throw new Error('Not an admin');
    }

    const { csvUrl } = data;

    var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'blob';
    xhr.onload = function(event) {
      var blob = xhr.response;
      console.log("event:", event);
      console.log("response:", xhr.response);
      console.log("status:", xhr.status);
      return response.status(200).send('ok');
    };
    console.log("url:", csvUrl);
    xhr.open('GET', csvUrl);
    xhr.send();
  });
});
