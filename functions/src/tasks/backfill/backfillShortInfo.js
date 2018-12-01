const { validate } = require('validate.js');
const cleaner = require('deep-cleaner');

const { constraints } = require('../../submitApplication/constraints');
const { db, functions } = require('../../utils/firestore');

const buildHackerShortInfo = (fullInfoDoc) => {
  const fields = Object.keys(constraints.hacker_short_info);
  const hackerFullInfoDoc = fullInfoDoc.data();
  const hackerShortInfo = {};
  fields.forEach((field) => {
    hackerShortInfo[field] = hackerFullInfoDoc[field];
  });

  cleaner(hackerShortInfo);

  return hackerShortInfo;
};

const hackerFullInfoCallback = (querySnapshot, response) => {
  const batch = db.batch();

  const promises = [];

  const hackerShortInfoList = [];

  querySnapshot.forEach((fullInfoDoc) => {
    const { id } = fullInfoDoc;
    const promise = new Promise((fulfill, reject) => {
      db.collection('hacker_short_info').doc(id).get().then((shortInfoDoc) => {
        const data = shortInfoDoc.data();

        if (data) {
          console.log(shortInfoDoc.id, ' doesn\'t need backfilling');
          fulfill();
          return;
        }

        console.log(fullInfoDoc.id, 'needs backfilling');

        const hackerShortInfo = buildHackerShortInfo(fullInfoDoc);

        const hackerShortInfoConstraints = Object.assign({}, constraints.hacker_short_info);
        delete hackerShortInfoConstraints.birthdate.presence;
        delete hackerShortInfoConstraints.isPrivacyPolicyChecked.presence;
        const errors = validate(hackerShortInfo, hackerShortInfoConstraints);

        if (errors) {
          reject(errors);
          return;
        }

        hackerShortInfoList.push(hackerShortInfo);

        fulfill();
      }).catch((e) => {
        reject(e);
      });
    });

    promises.push(promise);
  });

  Promise.all(promises).then(() => {
    hackerShortInfoList.forEach((hackerShortInfo) => {
      const { id } = hackerShortInfo;
      const ref = db.collection('hacker_short_info').doc(id);

      batch.set(ref, hackerShortInfo);
    });

    return batch.commit().then(() => {
      response.status(200).send();
    }).catch((e) => {
      response.status(500).send(e);
    });
  }).catch((e) => {
    response.status(500).send(e);
  });
};

exports.backfillShortInfo = functions.https.onRequest((request, response) => {
  // set origin and headers to allow CORS for local testing
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
  response.set('Access-Control-Allow-Origin', '*');
  response.set('Access-Control-Allow-Headers', 'Content-Type, crossDomain');

  // this function only allows POST requests
  response.set('Access-Control-Allow-Methods', 'POST');

  if (request.method !== 'POST') {
    return response.status(400).send('Unrecognized method'); // database error
  }

  db.collection('hacker_full_info').get().then((querySnapshot) => {
    hackerFullInfoCallback(querySnapshot, response);
  }).catch((e) => {
    response.status(500).send(e);
  });
});
