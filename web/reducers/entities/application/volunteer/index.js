import { ACTION_TYPES } from '../../../../actions';

export const initialState = {
  isSubmitted: false,
  firstName: '',
  lastName: '',
  email: '',
  city: null,
  school: null,
  gender: null,
  isOver19: null,
  gradYear: '',
  education: null,
  dayOne0830To1300: false,
  dayOne1300To1800: false,
  dayOne1800To2300: false,
  dayOneOvernight: false,
  dayTwo0800To1200: false,
  dayTwo1200To1800: false,
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
