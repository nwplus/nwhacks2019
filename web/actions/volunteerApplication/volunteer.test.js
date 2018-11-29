import { addVolunteerApplication } from '.';
import ACTION_TYPES from '../action_types';

describe('add hacker application', () => {
  it('creates an action to add hacker application', () => {
    const volunteerApplication = {
      isLoaded: true,
      data: {
        name: 'John Doe',
        school: 'UBC',
      },
    };

    const expectedAction = {
      type: ACTION_TYPES.ADD_VOLUNTEER_APPLICATION,
      volunteerApplication,
    };

    expect(addVolunteerApplication(volunteerApplication))
      .toEqual(expectedAction);
  });
});
