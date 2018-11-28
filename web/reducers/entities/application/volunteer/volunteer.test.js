import rootReducers from '../../..';
import volunteerApplication, { initialState } from '.';
import ACTION_TYPES from '../../../../actions/action_types';

describe('volunteer application reducer', () => {
  describe('when state is undefined', () => {
    it('returns the initial state', () => {
      expect(volunteerApplication(undefined, {})).toEqual(initialState);
    });
  });

  describe('when type is ADD_Volunteer_APPLICATION', () => {
    it('handles the action', () => {
      expect(
        volunteerApplication({}, {
          type: ACTION_TYPES.ADD_VOLUNTEER_APPLICATION,
          volunteerApplication: {
            name: 'John Doe',
            school: 'UBC',
          },
        })
      ).toEqual({
        name: 'John Doe',
        school: 'UBC',
      });
    });
  });

  describe('when type is not ADD_VOLUNTEER_APPLICATION and state is not undefined', () => {
    it('returns the state', () => {
      expect(
        volunteerApplication(
          { beforeState: 'before state' },
          { type: 'some action type', data: '1234' }
        )
      ).toEqual({ beforeState: 'before state' });
    });
  });
});

describe('when action type is RESET', () => {
  it('resets volunteerApplication to default state', () => {
    const state = {
      volunteerApplication: {
        isLoaded: true,
        data: {
          name: 'John Doe',
          school: 'UBC',
        },
      },
    };

    const action = { type: 'RESET' };
    expect(rootReducers(state, action).entities).toEqual({
      application: {
        hacker: initialState,
      },
    });
  });
});

describe('when action type is CANCEL_VOLUNTEER_APPLICATION', () => {
  it('resets hackerApplication to default state', () => {
    const state = {
      volunteerApplication: {
        isLoaded: true,
        data: {
          name: 'John Doe',
          school: 'UBC',
        },
      },
    };

    const action = { type: ACTION_TYPES.CANCEL_VOLUNTEER_APPLICATION };
    expect(rootReducers(state, action).entities).toEqual({
      application: {
        hacker: initialState,
      },
    });
  });
});
