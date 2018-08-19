import { ACTION_TYPES } from '../../../actions';

export const initialState = false;

const application = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.TOGGLE_APPLICATION:
      return action.enable;
    default:
      return state;
  }
};

export default application;
