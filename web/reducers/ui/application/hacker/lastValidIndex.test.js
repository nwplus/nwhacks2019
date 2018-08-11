import rootReducers from '../../..';
import lastValidIndexReducer from './lastValidIndex';
import ACTION_TYPES from '../../../../actions/action_types';

describe('active index reducer', () => {
  describe('when state is undefined', () => {
    it('returns the initial state', () => {
      expect(lastValidIndexReducer(undefined, {})).toEqual(0);
    });
  });

  describe('when type is CHANGE_HACKER_APPLICATION_LAST_VALID_INDEX', () => {
    it('handles the action', () => {
      expect(
        lastValidIndexReducer({}, {
          type: ACTION_TYPES.CHANGE_HACKER_APPLICATION_LAST_VALID_INDEX,
          index: 99,
        })
      ).toEqual(99);
    });
  });

  describe('when type is not CHANGE_HACKER_APPLICATION_LAST_VALID_INDEX and state is not undefined', () => {
    it('returns the state', () => {
      expect(
        lastValidIndexReducer(
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
      ui: {
        application: {
          hacker: {
            activeIndex: 3982,
          },
        },
      },
    };

    const action = { type: 'RESET' };
    const resetState = rootReducers(state, action);
    const { ui: { application: { hacker: { activeIndex } } } } = resetState;
    expect(activeIndex).toEqual(0);
  });
});
