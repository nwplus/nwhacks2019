import { ACTION_TYPES } from '../../../../actions';

const initialState = 0;

const changeVolunteerApplicationPage = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.CHANGE_VOLUNTEER_APPLICATION_PAGE:
      return action.page;
    default:
      return state;
  }
};

export default changeVolunteerApplicationPage;
