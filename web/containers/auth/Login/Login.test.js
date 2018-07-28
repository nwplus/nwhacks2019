import React from 'react';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Provider } from 'react-redux';
import { Switch, Route, Router, BrowserRouter } from 'react-router-dom';

// import Login from '../../../components/auth/Login/Login';
import { LoginContainer } from './Login';
import { store } from '../../../services/store/configureStore';

beforeAll(() => {
  configure({ adapter: new Adapter() });
});

describe('LoginContainer', () => {
  let props;
  let wrapper;

  const getWrapper = () => mount(
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route path="*">
            <LoginContainer {...props} />
          </Route>
        </Switch>
      </BrowserRouter>
    </Provider>
  );

  describe('when not logged in', () => {
    beforeEach(() => {
      const firebase = store.firebase;
      const auth = firebase.auth();

      props = {
        firebase: {
          login: auth.signInWithEmailAndPassword,
        },
        auth: {
          isLoaded: true,
          isEmpty: true,
        },
      };
    });

    it('renders login page', () => {
      wrapper = getWrapper();
      console.log(wrapper.html());
    });
  });
});
