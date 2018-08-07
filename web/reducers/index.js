import { combineReducers } from 'redux';
import entities from './entities';

const reducers = combineReducers({
  entities,
});

const rootReducers = (state, action) => {
  if (action.type === 'RESET') {
    state = undefined;
  }

  return reducers(state, action);
};

export default rootReducers;
