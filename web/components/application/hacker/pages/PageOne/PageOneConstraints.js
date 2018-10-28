import { atLeastOneCharacter } from '../../../constraints/utils';

export const constraints = {
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
};
