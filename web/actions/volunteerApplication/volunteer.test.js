import { addHackerApplication } from '.';
import ACTION_TYPES from '../action_types';

describe('add hacker application', () => {
  it('creates an action to add hacker application', () => {
    const hackerApplication = {
      isLoaded: true,
      data: {
        name: 'John Doe',
        school: 'UBC',
      },
    };

    const expectedAction = {
      type: ACTION_TYPES.ADD_HACKER_APPLICATION,
      hackerApplication,
    };

    expect(addHackerApplication(hackerApplication))
      .toEqual(expectedAction);
  });
});
