import { combineReducers } from 'redux';

import application from './application';

const featureFlagReducer = combineReducers({
  application,
});

export default featureFlagReducer;
