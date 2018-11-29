import ACTION_TYPES from '../action_types';

export const addVolunteerApplication = (volunteerApplication) => {
  return {
    type: ACTION_TYPES.ADD_VOLUNTEER_APPLICATION,
    volunteerApplication,
  };
};
