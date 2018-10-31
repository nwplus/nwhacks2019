import { atLeastOneCharacter } from '../../../constraints/utils';

export const constraints = {
  isFirstHackathon: {
    presence: true,
  },
  resumeLink: {
    presence: true,
    url: true,
  },
  interestForNwHacks: atLeastOneCharacter,
  recentProject: atLeastOneCharacter,
};
