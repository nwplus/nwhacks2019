import { ACTION_TYPES } from '../../../../actions';

const initialState = 0;

const changeVolunteerApplicationLastValidIndex = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.CHANGE_VOLUNTEER_APPLICATION_LAST_VALID_INDEX:
      return action.index;
    default:
      return state;
  }
};

export default changeVolunteerApplicationLastValidIndex;
