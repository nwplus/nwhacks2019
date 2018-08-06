import { ACTION_TYPES } from '../../../../actions';

const initialState = 0;

const changeHackerApplicationLastValidIndex = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.CHANGE_HACKER_APPLICATION_LAST_VALID_INDEX:
      return action.index;
    default:
      return state;
  }
};

export default changeHackerApplicationLastValidIndex;
