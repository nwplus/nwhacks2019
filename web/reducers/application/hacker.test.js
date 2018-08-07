import rootReducers from '..';
import hackerApplication from './hacker';
import ACTION_TYPES from '../../actions/action_types';

describe('hacker application reducer', () => {
  describe('when state is undefined', () => {
    it('returns the initial state', () => {
      expect(hackerApplication(undefined, {})).toEqual({
        isLoaded: true,
        data: undefined,
      });
    });
  });

  describe('when type is ADD_HACKER_APPLICATION', () => {
    it('handles the action', () => {
      expect(
        hackerApplication({}, {
          type: ACTION_TYPES.ADD_HACKER_APPLICATION,
          hackerApplication: {
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

  describe('when type is not ADD_HACKER_APPLICATION and state is not undefined', () => {
    it('returns the state', () => {
      expect(
        hackerApplication(
          { beforeState: 'before state' },
          { type: 'some action type', data: '1234' }
        )
      ).toEqual({ beforeState: 'before state' });
    });
  });
});

describe('when action type is RESET', () => {
  it('resets hackerApplication to default state', () => {
    const state = {
      hackerApplication: {
        isLoaded: true,
        data: {
          name: 'John Doe',
          school: 'UBC',
        },
      },
    };

    const action = { type: 'RESET' };
    expect(rootReducers(state, action)).toEqual({
      application: {
        hacker: {
          isLoaded: true,
          data: undefined,
        },
      },
    });
  });
});
