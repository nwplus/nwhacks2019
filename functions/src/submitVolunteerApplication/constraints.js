const { validate } = require('validate.js');
const moment = require('moment');

const atLeastOneCharacter = {
  presence: true,
  length: {
    minimum: 1,
    message: 'cannot be empty.',
  },
};

exports.constraints = {
  volunteer: {
    // =========
    //  PAGE ONE
    // =========
    firstName: atLeastOneCharacter,
    lastName: atLeastOneCharacter,
    city: atLeastOneCharacter,
    school: atLeastOneCharacter,
    gender: atLeastOneCharacter,
    isOver19: {
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
    email: {
      presence: true,
      email: {
        attribute: true,
        message: '^Please enter a valid email.',
      },
    },
    confirmEmail: {
      presence: true,
      email: {
        attribute: true,
        message: '^Please enter a valid email.',
      },
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
    interestForNwHacks: {
      presence: true,
      length: {
        minimum: 1,
        maximum: 250,
      },
    },
    hours: {
      presence: true,
    },
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
  },
  volunteer_full_info: {
    // =========
    //  PAGE ONE
    // =========
    firstName: atLeastOneCharacter,
    lastName: atLeastOneCharacter,
    city: atLeastOneCharacter,
    school: atLeastOneCharacter,
    gender: atLeastOneCharacter,
    isOver19: {
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
    email: {
      presence: true,
      email: {
        attribute: true,
        message: '^Please enter a valid email.',
      },
    },
    major: atLeastOneCharacter,
    phoneNumber: atLeastOneCharacter,
    ethnicity: atLeastOneCharacter,
    // =========
    //  PAGE TWO
    // =========
    interestForNwHacks: {
      presence: true,
      length: {
        minimum: 1,
        maximum: 250,
      },
    },
    freeHours: {
      presence: true,
    },
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
  },
  volunteer_short_info: {
    // =========
    //  PAGE ONE
    // =========
    firstName: atLeastOneCharacter,
    lastName: atLeastOneCharacter,
    city: atLeastOneCharacter,
    school: atLeastOneCharacter,
    gender: atLeastOneCharacter,
    isOver19: {
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
    email: {
      presence: true,
      email: {
        attribute: true,
        message: '^Please enter a valid email.',
      },
    },
    major: atLeastOneCharacter,
    phoneNumber: atLeastOneCharacter,
    ethnicity: atLeastOneCharacter,
    // =========
    //  PAGE TWO
    // =========
    freeHours: {
      presence: true,
    },
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
  },
  volunteer_long_info: {
    id: { presence: true },
    timestamp: { presence: true },
    interestForNwHacks: {
      presence: true,
      length: {
        minimum: 1,
        maximum: 750,
      },
    },
  },
};
