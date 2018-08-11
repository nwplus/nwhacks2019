import { combineReducers } from 'redux';

import application from './application';

const uiReducers = combineReducers({
  application,
});

export default uiReducers;
