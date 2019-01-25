const parse = require('csv-parse');
const { XMLHttpRequest } = require('xmlhttprequest');
const { db, functions, admin } = require('../utils/firestore');

const fieldNamesOrdered = [
  'timestamp',
  'email',
  'firstName',
  'lastName',
  'mentorOrExpo',
  'yearsOfExperience',
  'areaOfMentorship',
  'isStayingOvernight',
  'tShirtSize',
  'diet',
  'source',
  'womenInTech',
];

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

    const xhr = new XMLHttpRequest();
    xhr.responseType = 'text';
    xhr.onload = function (event) {
      const { responseText } = xhr;
      parse(responseText, (err, output) => {
        if (err) {
          return response.status(500).send(err);
        }

        const batch = db.batch();

        output.forEach((row) => {
          const mentorRef = db.collection('mentor_short_info').doc();
          const mentor = {};
          mentor.id = mentorRef.id;
          row.forEach((column, index) => {
            const fieldName = fieldNamesOrdered[index];
            if (fieldName) {
              if (fieldName === 'timestamp') {
                mentor[fieldName] = Date.now();
              } else {
                mentor[fieldName] = column;
              }
            }
            return 0;
          });
          return batch.set(mentorRef, mentor);
        });

        return batch.commit().then(() => response.status(200).send(output.length.toString()))
          .catch(e => response.status(500).send(e));
      });
    };
    xhr.open('GET', csvUrl);
    return xhr.send();
  });
});
