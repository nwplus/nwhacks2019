const { validate } = require('validate.js');
const cleaner = require('deep-cleaner');

const { constraints } = require('./constraints');
const { db, functions } = require('../../utils/firestore');

const hackerFullInfoCallback = (querySnapshot, response) => {
  const batch = db.batch();

  const promises = [];

  const hackerShortInfoList = [];

  querySnapshot.forEach((fullInfoDoc) => {
    const id = fullInfoDoc.id;
    const promise = new Promise((fulfill, reject) => {
      db.collection('hacker_short_info').doc(id).get().then((shortInfoDoc) => {
        const data = shortInfoDoc.data();

        if (data) {
          console.log(shortInfoDoc.id, ' doesn\'t need backfilling');
          fulfill()
        }

        console.log(fullInfoDoc.id, 'needs backfilling');

        const hackerShortInfo = buildHackerShortInfo(fullInfoDoc);

        const errors = validate(hackerShortInfo, constraints.hacker_short_info);

        if (errors) {
          console.log('validate errors: ', errors);
          reject(errors);
        }

        cleaner(hackerShortInfo);

        hackerShortInfoList.push(hackerShortInfo);

        fulfill();
      });
    });

    promises.push(promise);
  });

  Promise.all(promises).then(() => {
    console.log('promises success');
    response.status(200).send();
    hackerShortInfoList.forEach((hackerShortInfo) => {
      console.log(hackerShortInfo);
    })
  }).catch((e) => {
    console.log('promises error: ', e);
    response.status(500).send();
  });


  // return batch.commit().then(() => console.log('success!'));
}

// const hackerShortInfoCallback = (shortInfoDoc, fullInfoDoc) => {
//   const data = shortInfoDoc.data();
//   if (data) {
//     console.log(shortInfoDoc.id, ' doesn\'t need backfilling');
//     return;
//   }

//   console.log(fullInfoDoc.id, 'needs backfilling');

//   const hackerShortInfo = buildHackerShortInfo(fullInfoDoc);

//   const errors = validate(hackerShortInfo, constraints.hacker_short_info);

//   if (errors) {
//     console.log('validate errors: ', errors);
//   }

//   cleaner(hackerShortInfo);

//   return hackerShortInfo;
// }

const buildHackerShortInfo = (fullInfoDoc) => {
  const fields = Object.keys(constraints.hacker_short_info);
  const hackerFullInfoDoc = fullInfoDoc.data();
  const hackerShortInfo = {};
  fields.forEach((field) => {
    hackerShortInfo[field] = hackerFullInfoDoc[field];
  });

  // console.log('hacker short info: ', hackerShortInfo);
  return hackerShortInfo;
}

exports.backfillShortAndLongInfo = functions.https.onRequest((request, response) => {
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
