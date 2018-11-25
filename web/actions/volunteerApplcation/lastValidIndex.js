import ACTION_TYPES from '../action_types';

export const changeVolunteerApplicationLastValidIndex = (index) => {
  return {
    type: ACTION_TYPES.CHANGE_VOLUNTEER_APPLICATION_LAST_VALID_INDEX,
    index,
  };
};
