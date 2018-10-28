import { atLeastOneCharacter } from '../../../constraints/utils';

export const constraints = {
  isFirstHackathon: {
    presence: true,
  },
//   // interestedRole: atLeastOneCharacter,
  resumeLink: atLeastOneCharacter,
  interestForNwHacks: atLeastOneCharacter,
  // recentProject: atLeastOneCharacter,
};
