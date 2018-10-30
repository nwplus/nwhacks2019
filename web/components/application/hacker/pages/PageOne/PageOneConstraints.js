import validate from 'validate.js';
import * as moment from 'moment';
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
  major: atLeastOneCharacter,
  phoneNumber: atLeastOneCharacter,
  ethnicity: atLeastOneCharacter,
};
