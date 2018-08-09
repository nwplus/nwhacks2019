import { combineReducers } from 'redux';
import { hackerApplication } from './application';

const reducers = combineReducers({
  hackerApplication,
});

const rootReducers = (state, action) => {
  if (action.type === 'RESET') {
    state = undefined;
  }

  return reducers(state, action);
};

export default rootReducers;
