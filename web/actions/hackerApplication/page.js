import ACTION_TYPES from '../action_types';

export const changeHackerApplicationPage = (page) => {
  return {
    type: ACTION_TYPES.CHANGE_HACKER_APPLICATION_PAGE,
    page,
  };
};
