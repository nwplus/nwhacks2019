import { ACTION_TYPES } from '../../../../actions';

export const initialState = {
  isSubmitted: false,
  firstName: '',
  lastName: '',
  email: '',
  city: null,
  school: null,
  gender: null,
  over19: null,
  gradYear: '',
  education: null,
  travel: null,
};

const volunteerApplication = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.ADD_VOLUNTEER_APPLICATION:
      return action.volunteerApplication;
    default:
      return state;
  }
};

export default volunteerApplication;
