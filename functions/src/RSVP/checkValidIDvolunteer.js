const { db, functions } = require('../utils/firestore');

// Checks if 1) the given ID exists in hacker_short_info, and 2) that the applicant associated
// with that ID has been accepted. Returns the first name of the applicant is both 1) and 2)
// are satisfied, and an empty string otherwise.

exports.checkValidIDvolunteer = functions.https.onRequest((request, response) => {
  response.set('Access-Control-Allow-Origin', '*');
  response.set('Access-Control-Allow-Headers', 'Content-Type, crossDomain');

  const { id } = JSON.parse(request.body);

  getDoc = db.collection('volunteer_short_info').doc(id).get()
    .then((doc) => {
      const data = {
        rsvped: false,
        firstName: '',
      };

      if (!doc.exists) {
        console.log('Doc not found');
      } else {
        console.log('Found doc!');
        data.firstName = doc.data().firstName;

        if ('rsvp' in doc.data()) {
          console.log('Found doc but already RSVPed');
          data.rsvped = true;
        } 
      }

      return data;
    });
  getDoc.then(value => response.send(value)).catch(error => error);
});
