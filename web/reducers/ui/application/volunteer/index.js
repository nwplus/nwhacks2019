import { combineReducers } from 'redux';

import activeIndex from './activeIndex';
import lastValidIndex from './lastValidIndex';

const volunteerApplicationUI = combineReducers({
  activeIndex,
  lastValidIndex,
});

export default volunteerApplicationUI;
