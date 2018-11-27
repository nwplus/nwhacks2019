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
  day1_830_to_1: false,
  day1_1_to_6: false,
  day1_6_to_11: false,
  day1_overnight: false,
  day2_8_to_12: false,
  day2_12_to_6: false,
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
