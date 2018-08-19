import { combineReducers } from 'redux';
import entities from './entities';
import ui from './ui';

const reducers = combineReducers({
  entities,
  ui,
});

const rootReducers = (state, action) => {
  if (action.type === 'RESET') {
    state = undefined;
  }

  return reducers(state, action);
};

export default rootReducers;
