import { atLeastOneCharacter } from '../../../constraints/utils';

export const constraints = {
  firstName: atLeastOneCharacter,
  lastName: atLeastOneCharacter,
};
