import { atLeastOneCharacter } from '../../../constraints/utils';

export const constraints = {
  source: atLeastOneCharacter,
  isPrivacyPolicyChecked: {
    presence: true,
  },
  isCodeOfConductChecked: {
    presence: true,
  },
  isDataReportingChecked: {
    presence: true,
  },
  isDocumentsChecked: {
    presence: true,
  },
};
