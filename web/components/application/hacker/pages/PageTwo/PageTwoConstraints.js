import { atLeastOneCharacter } from '../../../constraints/utils';

export const constraints = {
  isFirstHackathon: {
    presence: true,
  },
  resumeLink: atLeastOneCharacter,
  interestForNwHacks: atLeastOneCharacter,
  recentProject: atLeastOneCharacter,
};
