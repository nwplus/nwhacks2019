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
  interestForNwHacks: {
    presence: true,
    length: {
      minimum: 1,
      maximum: 250,
    },
  },
  freeHours: {
    presence: true,
    length: {
      minimum: 1,
    },
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
};
