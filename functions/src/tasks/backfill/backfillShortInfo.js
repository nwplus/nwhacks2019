const { validate } = require('validate.js');
const cleaner = require('deep-cleaner');

const { constraints } = require('../../submitApplication/constraints');
const { db, functions, admin } = require('../../utils/firestore');

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

const getHackerShortInfosToBackfill = (snapShot) => {
  const promises = [];

  snapShot.forEach((fullInfoDoc) => {
    const { id } = fullInfoDoc;
    const promise = new Promise((fulfill, reject) => {
      db.collection('hacker_short_info').doc(id).get().then((shortInfoDoc) => {
        const data = shortInfoDoc.data();

        if (data) {
          console.log(shortInfoDoc.id, ' doesn\'t need backfilling');
          // fulfill null if doesn't need backfilling
          return fulfill();
        }

        console.log(fullInfoDoc.id, 'needs backfilling');

        const hackerShortInfo = buildHackerShortInfo(fullInfoDoc);

        const hackerShortInfoConstraints = Object.assign({}, constraints.hacker_short_info);
        delete hackerShortInfoConstraints.birthdate.presence;
        delete hackerShortInfoConstraints.isPrivacyPolicyChecked.presence;
        const errors = validate(hackerShortInfo, hackerShortInfoConstraints);

        if (errors) {
          return reject(errors);
        }

        return fulfill(hackerShortInfo);
      })
        .catch((e) => {
          reject(e);
        });
    });

    promises.push(promise);
  });

  return Promise.all(promises);
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

  let count = 0;

  const clientToken = request.body;
  admin.auth().verifyIdToken(clientToken).then((decodedToken) => {
    const { uid } = decodedToken;
    return db.collection('admins').doc(uid).get();
  }).then((adminDoc) => {
    if (!adminDoc) {
      throw new Error('Not an admin');
    }

    return db.collection('hacker_full_info').get();
  })
    .then(snapShot => getHackerShortInfosToBackfill(snapShot))
    .then((hackerShortInfoList) => {
      let batch = db.batch();
      const BATCH_LIMIT = 500;

      const promises = [];

      hackerShortInfoList.forEach((hackerShortInfo) => {
        // if we get null, it means we don't need to backfill this
        if (hackerShortInfo) {
          const { id } = hackerShortInfo;
          const ref = db.collection('hacker_short_info').doc(id);

          batch.set(ref, hackerShortInfo);
          count += 1;

          // every 500 docs
          if (count % BATCH_LIMIT === 0) {
            promises.push(batch.commit()); // commit current batch
            batch = db.batch(); // create new batch
          }
        }
      });

      promises.push(batch.commit()); // commit the remaining docs in the batch
      return Promise.all(promises);
    })
    .then(() => response.status(200).send(`${count}`))
    .catch((e) => {
      response.status(500).send(e);
    });
});
