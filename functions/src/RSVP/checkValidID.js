const { db, functions } = require('../utils/firestore');

// Checks if 1) the given ID exists in hacker_short_info, and 2) that the applicant associated
// with that ID has been accepted. Returns the first name of the applicant is both 1) and 2)
// are satisfied, and an empty string otherwise.

exports.checkValidID = functions.https.onRequest((request, response) => {
  response.set('Access-Control-Allow-Origin', '*');
  response.set('Access-Control-Allow-Headers', 'Content-Type, crossDomain');

  const { id, applicantType } = JSON.parse(request.body);
  let collection = '';

  if (applicantType === 'volunteer') {
    collection = 'volunteer_short_info';
  } else if (applicantType === 'hacker') {
    collection = 'hacker_short_info';
  }

  getDoc = db.collection(collection).doc(id).get()
    .then((doc) => {
      const data = {
        accepted: false,
        rsvped: false,
        firstName: '',
      };

      if (!doc.exists) {
        console.log('Doc not found');
        return data;
      }

      if ('tags' in doc.data() && 'accepted' in doc.data().tags && doc.data().tags.accepted) {
        data.accepted = true;
        if ('rsvp' in doc.data()) {
          console.log('Found doc but already RSVPed');
          data.rsvped = true;
        } else {
          console.log('Found doc!');
          data.firstName = doc.data().firstName;
        }
      } else {
        console.log('Found doc but was not accepted');
      }

      return data;
    });
  getDoc.then(value => response.send(value)).catch(error => error);
});
