import { combineReducers } from 'redux';

import application from './application';
import { ACTION_TYPES } from '../../actions';

// const uiReducers = combineReducers({
//   application,
// });

// export default uiReducers;

const uiReducers = combineReducers({
  application,
});

const uiReducersWrapper = (state, action) => {
  if (action.type === ACTION_TYPES.CANCEL_HACKER_APPLICATION) {
    state = undefined;
  }

  return uiReducers(state, action);
};

export default uiReducersWrapper;
