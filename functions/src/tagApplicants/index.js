const { db, functions, admin } = require('../utils/firestore');

const mapApplicantTypeToCollection = {
  hacker: 'hacker_short_info',
  volunteer: 'volunteer_short_info',
  mentor: 'mentor_short_info',
};

const BATCH_LIMIT = 500;

// cloud function for submitting hacker application
exports.tagApplicants = functions.https.onRequest((request, response) => {
  // set origin and headers to allow CORS for local testing
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
  response.set('Access-Control-Allow-Origin', '*');
  response.set('Access-Control-Allow-Headers', 'Content-Type, crossDomain');

  // this function only allows POST requests
  response.set('Access-Control-Allow-Methods', 'POST');
  if (request.method !== 'POST') {
    return response.status(400).send('Unrecognized method'); // database error
  }

  // ensure request.body is an object, not a string
  const data = typeof request.body !== 'object' ? JSON.parse(request.body) : request.body;

  const clientToken = request.header('Authorization');

  const {
    applicantType,
    applicants,
    tagsToAdd,
    tagsToRemove,
  } = data;

  const collection = mapApplicantTypeToCollection[applicantType];
  if (!collection) {
    return response.status(400).send('Unrecognized applicant type');
  }

  if (!tagsToAdd || tagsToAdd.constructor !== Array) {
    return response.status(400).send('tagsToAdd field is missing/not an array');
  }

  if (!tagsToRemove || tagsToRemove.constructor !== Array) {
    return response.status(400).send('tagsToRemove field is missing/not an array');
  }

  if (!applicants || applicants.constructor !== Array) {
    return response.status(400).send('applicants field is missing/not an array');
  }

  return admin.auth().verifyIdToken(clientToken).then((decodedToken) => {
    const { uid } = decodedToken;
    return db.collection('admins').doc(uid).get();
  }).then((adminDoc) => {
    if (!adminDoc) {
      throw new Error('Not an admin');
    }

    // eslint-disable-next-line max-len
    return Promise.all(applicants.map(applicantId => db.collection(collection).doc(applicantId).get()));
  })
    .then((applicantDocs) => {
      let batch = db.batch();

      const batchCommitPromises = [];

      applicantDocs.map((applicantDoc, index) => {
        const applicant = applicantDoc.data();
        const { id: applicantId } = applicantDoc;
        let { tags } = applicant;
        if (typeof tags !== 'object') {
          tags = {};
        }

        tagsToAdd.forEach((tagToAdd) => {
          tags[tagToAdd] = true;
        });

        tagsToRemove.forEach((tagToRemove) => {
          delete tags[tagToRemove];
        });

        const ref = db.collection(collection).doc(applicantId);
        console.log(tags);
        batch.set(ref, { tags }, { mergeFields: ['tags'] });

        // every 500 docs
        if (index % BATCH_LIMIT === BATCH_LIMIT - 1) {
          batchCommitPromises.push(batch.commit()); // commit current batch
          batch = db.batch(); // create new batch
        }
      });

      batchCommitPromises.push(batch.commit()); // commit the remaining docs in the batch

      return Promise.all(batchCommitPromises);
    })
    .then(() => response.status(200).send())
    .catch(e => response.status(500).send(e));
});
