
import { combineReducers } from 'redux';
import hacker from './hacker/index';

import { ACTION_TYPES } from '../../../actions';

const applicationReducers = combineReducers({
  hacker,
});

const applicationReducersWrapper = (state, action) => {
  if (action.type === ACTION_TYPES.CANCEL_HACKER_APPLICATION) {
    state = undefined;
  }

  return applicationReducers(state, action);
};

export default applicationReducersWrapper;
