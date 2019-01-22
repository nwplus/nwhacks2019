const { db, functions } = require('../utils/firestore');

// Returns an array of all NFC devices stored in collection nfc_devices

exports.getNFCdevices = functions.https.onRequest((request, response) => {
  response.set('Access-Control-Allow-Origin', '*');
  response.set('Access-Control-Allow-Headers', 'Content-Type, crossDomain');

  NFCdevices = {};

  docs = db.collection("nfc_devices").get().then(function(querySnapshot) {
    querySnapshot.forEach((doc) => {
      model = doc.data().model;
      email = doc.data().email;

      NFCdevices[model + "-" + email] = doc.data();
    });
    return NFCdevices;
  });
  docs.then(value => response.send(value)).catch(error => error);
});
