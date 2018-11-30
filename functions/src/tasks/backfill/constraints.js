const { validate } = require('validate.js');
const moment = require('moment');

const atLeastOneCharacter = {
  presence: true,
  length: {
    minimum: 1,
    message: 'cannot be empty.',
  },
};

validate.extend(validate.validators.datetime, {
  // The value is guaranteed not to be null or undefined but otherwise it
  // could be anything.
  parse(value) {
    return Number(moment.utc(value, 'YYYY-MM-DD', true));
  },
  // Input is a unix timestamp
  format(value) {
    return moment.utc(value).format('YYYY-MM-DD');
  },
});

exports.constraints = {
  hacker_short_info: {
    id: { presence: true },
    timestamp: { presence: true },
    // =========
    //  PAGE ONE
    // =========
    firstName: atLeastOneCharacter,
    lastName: atLeastOneCharacter,
    email: { email: true },
    city: atLeastOneCharacter,
    school: atLeastOneCharacter,
    gender: atLeastOneCharacter,
    birthdate: {
      // don't check presence since this was lost for some documents
      date: {
        message: '^Please enter a valid birthday.',
      },
    },
    education: atLeastOneCharacter,
    gradYear: {
      presence: true,
      length: {
        is: 4,
      },
    },
    travel: { presence: true },
    major: atLeastOneCharacter,
    phoneNumber: atLeastOneCharacter,
    ethnicity: atLeastOneCharacter,
    // =========
    //  PAGE TWO
    // =========
    isFirstHackathon: { presence: true },
    resumeLink: {
      presence: true,
      url: true,
    },
    // =========
    //  PAGE THREE
    // =========
    source: atLeastOneCharacter,
    isPrivacyPolicyChecked: {
      // don't check presence since this was lost for some documents
      inclusion: {
        within: [true],
      },
    },
    isCodeOfConductChecked: {
      presence: true,
      inclusion: {
        within: [true],
      },
    },
    isDataReportingChecked: {
      presence: true,
      inclusion: {
        within: [true],
      },
    },
    isDocumentsChecked: {
      presence: true,
      inclusion: {
        within: [true],
      },
    },
  },
};
