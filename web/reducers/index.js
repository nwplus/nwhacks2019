import { combineReducers } from 'redux'

function currentUser(state = null, action) {
  let newState = {};
  switch (action.type) {
    case 'ADD_CURRENT_USER':
      return action.currentUser;
    case 'REMOVE_CURRENT_USER':
      return action.currentUser;
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  currentUser
});

export default rootReducer;
