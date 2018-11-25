import ACTION_TYPES from '../action_types';

export const changeVolunteerApplicationPage = (page) => {
  return {
    type: ACTION_TYPES.CHANGE_VOLUNTEER_APPLICATION_PAGE,
    page,
  };
};
