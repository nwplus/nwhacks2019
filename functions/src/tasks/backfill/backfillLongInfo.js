const { validate } = require('validate.js');
const cleaner = require('deep-cleaner');

const { constraints } = require('../../submitApplication/constraints');
const { db, functions, admin } = require('../../utils/firestore');

const buildHackerLongInfo = (fullInfoDoc) => {
  const fields = Object.keys(constraints.hacker_long_info);
  const hackerFullInfoDoc = fullInfoDoc.data();
  const hackerLongInfo = {};
  fields.forEach((field) => {
    hackerLongInfo[field] = hackerFullInfoDoc[field];
  });

  cleaner(hackerLongInfo);

  return hackerLongInfo;
};

const getHackerLongInfosToBackfill = (snapShot) => {
  const promises = [];

  snapShot.forEach((fullInfoDoc) => {
    const { id } = fullInfoDoc;
    const promise = new Promise((fulfill, reject) => {
      db.collection('hacker_long_info').doc(id).get().then((longInfoDoc) => {
        const data = longInfoDoc.data();

        if (data) {
          console.log(longInfoDoc.id, ' doesn\'t need backfilling');
          // fulfill null if doesn't need backfilling
          return fulfill();
        }

        console.log(fullInfoDoc.id, 'needs backfilling');

        const hackerLongInfo = buildHackerLongInfo(fullInfoDoc);

        const errors = validate(hackerLongInfo, constraints.hacker_long_info);

        if (errors) {
          return reject(errors);
        }

        return fulfill(hackerLongInfo);
      })
        .catch((e) => {
          reject(e);
        });
    });

    promises.push(promise);
  });

  return Promise.all(promises);
};

exports.backfillLongInfo = functions.https.onRequest((request, response) => {
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
    .then(snapShot => getHackerLongInfosToBackfill(snapShot))
    .then((hackerLongInfoList) => {
      let batch = db.batch();
      const BATCH_LIMIT = 500;

      const promises = [];

      hackerLongInfoList.forEach((hackerLongInfo) => {
        // if we get null, it means we don't need to backfill this
        if (hackerLongInfo) {
          const { id } = hackerLongInfo;
          const ref = db.collection('hacker_long_info').doc(id);

          batch.set(ref, hackerLongInfo);
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
