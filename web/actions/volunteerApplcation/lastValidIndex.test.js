import { changeHackerApplicationLastValidIndex } from '.';
import ACTION_TYPES from '../action_types';

describe('change last valid index for hacker hackerApplcation', () => {
  it('creates an action to change last valid index for hacker hackerApplcation', () => {
    const expectedAction = {
      type: ACTION_TYPES.CHANGE_HACKER_APPLICATION_LAST_VALID_INDEX,
      index: 3243,
    };

    expect(changeHackerApplicationLastValidIndex(3243))
      .toEqual(expectedAction);
  });
});
