import { atLeastOneCharacter } from '../../../constraints/utils';

export const constraints = {
  source: atLeastOneCharacter,
  isCheckedPrivacyPolicy: {
    presence: true,
  },
  isCheckedCodeOfConduct: {
    presence: true,
  },
  isCheckedDataReporting: {
    presence: true,
  },
  isCheckedDocuments: {
    presence: true,
  },
};
