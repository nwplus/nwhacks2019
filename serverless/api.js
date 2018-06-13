'use strict';

const utils = require('./utils');

const integrations = {
  github: require('./integrations/github'),
  firestore: require('./integrations/firestore'),
}

/**
 * GET /example
 */
module.exports.example = (event, context, callback) => {
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Hello world!',
      input: event,
    }),
  };

  callback(null, response);
};
