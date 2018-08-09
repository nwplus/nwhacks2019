import { ACTION_TYPES } from '../../../../actions';

const initialState = 0;

const changeHackerApplicationPage = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.CHANGE_HACKER_APPLICATION_PAGE:
      return action.page;
    default:
      return state;
  }
};

export default changeHackerApplicationPage;
