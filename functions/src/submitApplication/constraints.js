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
  hacker: {
    // =========
    //  PAGE ONE
    // =========
    firstName: atLeastOneCharacter,
    lastName: atLeastOneCharacter,
    city: atLeastOneCharacter,
    school: atLeastOneCharacter,
    gender: atLeastOneCharacter,
    birthday: {
      date: {
        message: '^Please enter a valid birthday.',
      },
      presence: true,
    },
    education: atLeastOneCharacter,
    gradYear: {
      presence: true,
      length: {
        is: 4,
        message: 'has to be a valid year.',
      },
    },
    travel: {
      presence: true,
    },
    email: {
      email: true,
    },
    confirmEmail: {
      email: true,
      equality: {
        attribute: 'email',
        message: '^Please enter the same email.',
      },
    },
    major: atLeastOneCharacter,
    phoneNumber: atLeastOneCharacter,
    ethnicity: atLeastOneCharacter,
    // =========
    //  PAGE TWO
    // =========
    isFirstHackathon: {
      presence: true,
    },
    resumeLink: {
      presence: true,
      url: true,
    },
    interestForNwHacks: {
      presence: true,
      length: {
        minimum: 1,
        maximum: 750,
      },
    },
    recentProject: {
      presence: true,
      length: {
        minimum: 1,
        maximum: 750,
      },
    },
    // =========
    //  PAGE THREE
    // =========
    source: atLeastOneCharacter,
    isPrivacyPolicyChecked: {
      presence: true,
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
    recaptchaResponse: atLeastOneCharacter,
  },
};
