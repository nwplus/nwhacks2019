import { ACTION_TYPES } from '../../../../actions';

export const initialState = {
  isSubmitted: false,
  firstName: '',
  lastName: '',
  email: '',
  city: null,
  school: null,
  gender: null,
  isAdult: null,
  gradYear: '',
  education: null,
  travel: null,
};

const hackerApplication = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.ADD_HACKER_APPLICATION:
      return action.hackerApplication;
    default:
      return state;
  }
};

export default hackerApplication;
