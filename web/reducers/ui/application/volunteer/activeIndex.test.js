import rootReducers from '../../..';
import activeIndexReducer from './activeIndex';
import ACTION_TYPES from '../../../../actions/action_types';

describe('active index reducer', () => {
  describe('when state is undefined', () => {
    it('returns the initial state', () => {
      expect(activeIndexReducer(undefined, {})).toEqual(0);
    });
  });

  describe('when type is CHANGE_VOLUNTEER_APPLICATION_PAGE', () => {
    it('handles the action', () => {
      expect(
        activeIndexReducer({}, {
          type: ACTION_TYPES.CHANGE_VOLUNTEER_APPLICATION_PAGE,
          page: 99,
        })
      ).toEqual(99);
    });
  });

  describe('when type is not CHANGE_HACKER_APPLICATION_PAGE and state is not undefined', () => {
    it('returns the state', () => {
      expect(
        activeIndexReducer(
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

describe('when action type is CANCEL_HACKER_APPLICATION', () => {
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

    const action = { type: ACTION_TYPES.CANCEL_HACKER_APPLICATION };
    const resetState = rootReducers(state, action);
    const { ui: { application: { hacker: { activeIndex } } } } = resetState;
    expect(activeIndex).toEqual(0);
  });
});
