
const atLeastOneCharacter = {
  presence: true,
  length: {
    minimum: 1,
    message: 'cannot be empty.',
  },
};

// TODO: update hacker constraints
exports.constraints = {
  hacker: {
    // page one
    firstName: atLeastOneCharacter,
    lastName: atLeastOneCharacter,
    city: atLeastOneCharacter,
    school: atLeastOneCharacter,
    gender: atLeastOneCharacter,
    isAdult: {
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
    major: atLeastOneCharacter,
    phoneNumber: atLeastOneCharacter,
    ethnicity: atLeastOneCharacter,
    // page two
    isFirstHackathon: {
      presence: true,
    },
    // githubLink: {
    //   url: true,
    // },
    // personalWebsiteLink: {
    //   url: true,
    // },
    // linkedInLink: {
    //   url: true,
    // },
    resumeLink: {
      presence: true,
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
    recaptchaResponse: atLeastOneCharacter,
  },
};
