const atLeastOneCharacter = {
  presence: true,
  length: {
    minimum: 1,
    message: 'cannot be empty.',
  },
};

exports.constraints = {
  rsvp: {
    emergencyContactName: atLeastOneCharacter,
    emergencyContactNumber: atLeastOneCharacter,
    tShirtSize: atLeastOneCharacter,
    dietRestriction: atLeastOneCharacter,
  },
};
