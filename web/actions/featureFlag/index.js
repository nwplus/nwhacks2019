import ACTION_TYPES from '../action_types';

export const toggleApplication = (enable) => {
  return {
    type: ACTION_TYPES.TOGGLE_APPLICATION,
    enable,
  };
};
