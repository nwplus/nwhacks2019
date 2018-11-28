import { changeVolunteerApplicationPage } from '.';
import ACTION_TYPES from '../action_types';

describe('change active index for hacker application', () => {
  it('creates an action to change active index for hacker application', () => {
    const expectedAction = {
      type: ACTION_TYPES.CHANGE_VOLUNTEER_APPLICATION_PAGE,
      page: 3243,
    };

    expect(changeVolunteerApplicationPage(3243))
      .toEqual(expectedAction);
  });
});
