import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Login from '../../../components/auth/Login/Login';
import { LoginContainer } from './Login';

beforeAll(() => {
  configure({ adapter: new Adapter() });
});

describe('LoginContainer', () => {
  let props;
  let wrapper;
  const getWrapper = () => shallow(<LoginContainer {...props} />);

  describe('when something', () => {
    const login = jest.fn();

    beforeEach(() => {
      const firebase = { login };
      const auth = { isLoaded: true, isEmpty: false };

      props = {
        firebase,
        auth,
      };

      wrapper = getWrapper();
    });

    it('isLoaded is true in AfterLogin component', () => {
      console.log(wrapper.find(Login).props());
    });
  });
});
