export const atLeastOneCharacter = {
  presence: true,
  length: {
    minimum: 1,
    message: 'cannot be empty.',
  },
};
