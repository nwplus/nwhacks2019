import { atLeastOneCharacter } from '../../../constraints/utils';

export const constraints = {
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
  isDataReportingChecked: {
    presence: true,
    inclusion: {
      within: [true],
    },
  },
  isDocumentsChecked: {
    presence: true,
    inclusion: {
      within: [true],
    },
  },
};
