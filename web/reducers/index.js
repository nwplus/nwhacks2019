import { combineReducers } from 'redux';
import application from './application';

const reducers = combineReducers({
  application,
});

const rootReducers = (state, action) => {
  if (action.type === 'RESET') {
    state = undefined;
  }

  return reducers(state, action);
};

export default rootReducers;
