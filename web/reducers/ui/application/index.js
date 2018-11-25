import { combineReducers } from 'redux';

import hacker from './hacker';
import volunteer from './volunteer';
import { ACTION_TYPES } from '../../../actions';

const applicationUI = combineReducers({
  hacker,
  volunteer,
});

const applicationUIWrapper = (state, action) => {
  if (action.type === ACTION_TYPES.CANCEL_HACKER_APPLICATION
      || action.type === ACTION_TYPES.RESET_HACKER_UI
      || action.type === ACTION_TYPES.RESET_VOLUNTEER_UI
      || action.type === ACTION_TYPES.CANCEL_VOLUNTEER_APPLICATION) {
    state = undefined;
  }

  return applicationUI(state, action);
};

export default applicationUIWrapper;
