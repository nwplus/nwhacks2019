import { combineReducers } from 'redux';
import entities from './entities';
import ui from './ui';
import featureFlag from './featureFlag';

const reducers = combineReducers({
  entities,
  ui,
  featureFlag,
});

const rootReducers = (state, action) => {
  if (action.type === 'RESET') {
    state = undefined;
  }

  return reducers(state, action);
};

export default rootReducers;
