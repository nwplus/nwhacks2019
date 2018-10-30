import { combineReducers } from 'redux';

import hacker from './hacker';

import { ACTION_TYPES } from '../../../actions';

const applicationUI = combineReducers({
  hacker,
});

const applicationUIWrapper = (state, action) => {
  if (action.type === ACTION_TYPES.CANCEL_HACKER_APPLICATION
      || action.type === ACTION_TYPES.RESET_HACKER_UI) {
    state = undefined;
  }

  return applicationUI(state, action);
};

export default applicationUIWrapper;
