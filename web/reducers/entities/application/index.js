
import { combineReducers } from 'redux';
import hacker from './hacker/index';

const applicationReducers = combineReducers({
  hacker,
});

export default applicationReducers;
