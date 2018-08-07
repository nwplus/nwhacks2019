import { combineReducers } from 'redux';
import application from './application';

const entitiesReducers = combineReducers({
  application,
});

export default entitiesReducers;
