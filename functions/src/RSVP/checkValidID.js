const { db, functions } = require('../utils/firestore');

// Checks if 1) the given ID exists in hacker_short_info, and 2) that the applicant associated
// with that ID has been accepted. Returns the first name of the applicant is both 1) and 2)
// are satisfied, and an empty string otherwise.

exports.checkValidID = functions.https.onRequest((request, response) => {
  response.set('Access-Control-Allow-Origin', '*');
  response.set('Access-Control-Allow-Headers', 'Content-Type, crossDomain');

  const id = JSON.parse(request.body).id;

  getDoc = db.collection('hacker_short_info').doc(id).get()
    .then((doc) => {
      if (!doc.exists) {
        console.log(id + ' has no doc');
        return "";
      }
      if ('tags' in doc.data() && 'accepted' in doc.data().tags && doc.data().tags.accepted) {
        console.log(doc.data().firstName + ' was found and is accepted');
        return JSON.stringify(doc.data().firstName);
      }
      console.log(id + ' has doc, but was not accepted');
      return "";
    });
  getDoc.then(value => response.send(value)).catch(error => error);
});
