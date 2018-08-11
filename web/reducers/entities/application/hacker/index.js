import { ACTION_TYPES } from '../../../../actions';

const initialState = null;

const hackerApplication = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.ADD_HACKER_APPLICATION:
      return action.hackerApplication;
    default:
      return state;
  }
};

export default hackerApplication;
