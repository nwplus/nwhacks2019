import { combineReducers } from 'redux';

import activeIndex from './activeIndex';
import lastValidIndex from './lastValidIndex';

const hackerApplicationUI = combineReducers({
  activeIndex,
  lastValidIndex,
});

export default hackerApplicationUI;
