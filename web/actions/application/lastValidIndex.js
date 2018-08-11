import ACTION_TYPES from '../action_types';

export const changeHackerApplicationLastValidIndex = (index) => {
  return {
    type: ACTION_TYPES.CHANGE_HACKER_APPLICATION_LAST_VALID_INDEX,
    index,
  };
};
