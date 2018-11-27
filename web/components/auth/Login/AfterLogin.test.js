import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Redirect } from 'react-router-dom';

import AfterLogin from './AfterLogin';

beforeAll(() => {
  configure({ adapter: new Adapter() });
});

describe('AfterLoginContainer', () => {
  let props;
  let wrapper;
  const getWrapper = () => shallow(<AfterLogin {...props} />);

  describe('when hacker application is loaded', () => {
    beforeEach(() => {
      props = { isLoaded: true };
      wrapper = getWrapper();
    });

    it('redirects to dashboard', () => {
      const redirect = wrapper.find(Redirect);
      expect(redirect).toHaveProperty('length', 1);
      expect(wrapper.find(Redirect).props()).toHaveProperty('to', '/dashboard');
    });
  });

  describe('when hacker application is not loaded', () => {
    beforeEach(() => {
      props = { isLoaded: false };
      wrapper = getWrapper();
    });

    it('returns an empty div while loading', () => {
      expect(wrapper.html()).toEqual('<div></div>');
    });
  });
});
