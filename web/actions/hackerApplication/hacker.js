import ACTION_TYPES from '../action_types';

export const addHackerApplication = (hackerApplication) => {
  return {
    type: ACTION_TYPES.ADD_HACKER_APPLICATION,
    hackerApplication,
  };
};
