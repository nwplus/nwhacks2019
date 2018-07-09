import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Link } from 'react-router-dom';

import Navbar from '.';
import { DISPLAY_TYPE } from '../../containers/navbar/DisplayTypes';
import { BUTTON_TYPE } from '../../containers/navbar/ButtonTypes';

beforeAll(() => {
  configure({ adapter: new Adapter() });
});

describe('Navbar component', () => {
  let props;
  let wrapper;
  const getWrapper = () => shallow(<Navbar {...props} />);

  describe('when the display type is LOGO_BUTTON_AND_LINKS', () => {
    describe('when the button type is DASHBOARD', () => {
      beforeEach(() => {
        props = {
          displayType: DISPLAY_TYPE.LOGO_BUTTON_AND_LINKS,
          buttonType: BUTTON_TYPE.DASHBOARD,
        };

        wrapper = getWrapper();
      });

      test('there are five Links', () => {
        expect(wrapper.find(Link)).toHaveProperty('length', 5);
      });

      test('the first link is to home page', () => {
        expect(wrapper.find(Link).first().props()).toHaveProperty('to', '/');
      });

      test('the last link is to dashboard page', () => {
        expect(wrapper.find(Link).last().props()).toHaveProperty('to', '/dashboard');
      });
    });

    describe('when the button type is SIGN_IN', () => {
      beforeEach(() => {
        props = {
          displayType: DISPLAY_TYPE.LOGO_BUTTON_AND_LINKS,
          buttonType: BUTTON_TYPE.SIGN_IN,
        };

        wrapper = getWrapper();
      });

      test('there are five Links', () => {
        expect(wrapper.find(Link)).toHaveProperty('length', 5);
      });

      test('the first link is to home page', () => {
        expect(wrapper.find(Link).first().props()).toHaveProperty('to', '/');
      });

      test('the last link is to sign in page', () => {
        expect(wrapper.find(Link).last().props()).toHaveProperty('to', '/login');
      });
    });
  });

  describe('when the display type is LOGO_AND_BUTTON', () => {
    describe('when the button type is SIGN_OUT', () => {
      beforeEach(() => {
        props = {
          displayType: DISPLAY_TYPE.LOGO_AND_BUTTON,
          buttonType: BUTTON_TYPE.SIGN_OUT,
        };

        wrapper = getWrapper();
      });

      test('there are two Links', () => {
        expect(wrapper.find(Link)).toHaveProperty('length', 2);
      });

      test('the first link is to home page', () => {
        expect(wrapper.find(Link).first().props()).toHaveProperty('to', '/');
      });

      test('the last link is to sign out page', () => {
        expect(wrapper.find(Link).last().props()).toHaveProperty('to', '/logout');
      });
    });
  });

  describe('when the display type is ONLY_LOGO', () => {
    beforeEach(() => {
      props = {
        displayType: DISPLAY_TYPE.ONLY_LOGO,
        buttonType: BUTTON_TYPE.NONE,
      };

      wrapper = getWrapper();
    });

    test('there is one Link', () => {
      expect(wrapper.find(Link)).toHaveProperty('length', 1);
    });

    test('the link is to home page', () => {
      expect(wrapper.find(Link).first().props()).toHaveProperty('to', '/');
    });

    describe('when the button type is not NONE', () => {
      beforeEach(() => {
        props = {
          displayType: DISPLAY_TYPE.ONLY_LOGO,
          buttonType: BUTTON_TYPE.SIGN_OUT,
        };

        wrapper = getWrapper();
      });

      test('there is one Link', () => {
        expect(wrapper.find(Link)).toHaveProperty('length', 1);
      });

      test('the first link is to home page', () => {
        expect(wrapper.find(Link).first().props()).toHaveProperty('to', '/');
      });
    });
  });
});
