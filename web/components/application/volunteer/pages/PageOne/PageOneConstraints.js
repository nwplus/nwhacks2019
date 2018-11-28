import validate from 'validate.js';
import moment from 'moment';
import { atLeastOneCharacter } from '../../../constraints/utils';

validate.extend(validate.validators.datetime, {
  // The value is guaranteed not to be null or undefined but otherwise it
  // could be anything.
  parse(value) {
    return +moment.utc(value, 'YYYY-MM-DD', true);
  },
  // Input is a unix timestamp
  format(value) {
    return moment.utc(value).format('YYYY-MM-DD');
  },
});

export const constraints = {
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
};
