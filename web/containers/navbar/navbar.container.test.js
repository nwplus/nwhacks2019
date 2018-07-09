import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { NavbarContainer } from '.';
import Navbar from '../../components/navbar';
import { DISPLAY_TYPE } from './DisplayTypes';
import { BUTTON_TYPE } from './ButtonTypes';

beforeAll(() => {
  configure({ adapter: new Adapter() });
});

describe('Navbar container', () => {
  let location;
  let signedIn;

  let wrapper;
  let navbarWrapper;

  describe('when the location is home page', () => {
    beforeEach(() => {
      location = {
        pathname: '/',
      };
    });

    describe('when user is signed in', () => {
      beforeEach(() => {
        signedIn = true;

        wrapper = shallow(<NavbarContainer location={location} signedIn={signedIn} />);
        navbarWrapper = wrapper.find(Navbar);
      });

      test('NavbarContainer contains one Navbar component', () => {
        expect(navbarWrapper).toHaveProperty('length', 1);
      });

      test('Display type of NavbarContainer is LOGO_BUTTON_AND_LINKS', () => {
        expect(navbarWrapper.props()).toHaveProperty('displayType', DISPLAY_TYPE.LOGO_BUTTON_AND_LINKS);
      });

      test('Button type of NavbarContainer is DASHBOARD', () => {
        expect(navbarWrapper.props()).toHaveProperty('buttonType', BUTTON_TYPE.DASHBOARD);
      });
    });

    describe('when user is not signed in', () => {
      beforeEach(() => {
        signedIn = false;

        wrapper = shallow(<NavbarContainer location={location} signedIn={signedIn} />);
        navbarWrapper = wrapper.find(Navbar);
      });

      test('NavbarContainer contains one Navbar component', () => {
        expect(navbarWrapper).toHaveProperty('length', 1);
      });

      test('Display type of NavbarContainer is LOGO_BUTTON_AND_LINKS', () => {
        expect(navbarWrapper.props()).toHaveProperty('displayType', DISPLAY_TYPE.LOGO_BUTTON_AND_LINKS);
      });

      test('Button type of NavbarContainer is SIGN_IN', () => {
        expect(navbarWrapper.props()).toHaveProperty('buttonType', BUTTON_TYPE.SIGN_IN);
      });
    });
  });

  describe('when the location is dashboard page', () => {
    beforeEach(() => {
      location = {
        pathname: '/dashboard',
      };
    });

    describe('when user is signed in', () => {
      beforeEach(() => {
        signedIn = true;

        wrapper = shallow(<NavbarContainer location={location} signedIn={signedIn} />);
        navbarWrapper = wrapper.find(Navbar);
      });

      test('NavbarContainer contains one Navbar component', () => {
        expect(navbarWrapper).toHaveProperty('length', 1);
      });

      test('Display type of NavbarContainer is LOGO_AND_BUTTON', () => {
        expect(navbarWrapper.props()).toHaveProperty('displayType', DISPLAY_TYPE.LOGO_AND_BUTTON);
      });

      test('Button type of NavbarContainer is SIGN_OUT', () => {
        expect(navbarWrapper.props()).toHaveProperty('buttonType', BUTTON_TYPE.SIGN_OUT);
      });
    });
  });

  describe('when the location is neither home or dashboard page', () => {
    beforeEach(() => {
      location = {
        pathname: '/some_page',
      };
    });

    describe('when user is signed in', () => {
      beforeEach(() => {
        signedIn = true;

        wrapper = shallow(<NavbarContainer location={location} signedIn={signedIn} />);
        navbarWrapper = wrapper.find(Navbar);
      });

      test('NavbarContainer contains one Navbar component', () => {
        expect(navbarWrapper).toHaveProperty('length', 1);
      });

      test('Display type of NavbarContainer is ONLY_LOGO', () => {
        expect(navbarWrapper.props()).toHaveProperty('displayType', DISPLAY_TYPE.ONLY_LOGO);
      });

      test('Button type of NavbarContainer is NONE', () => {
        expect(navbarWrapper.props()).toHaveProperty('buttonType', BUTTON_TYPE.NONE);
      });
    });

    describe('when user is not signed in', () => {
      beforeEach(() => {
        signedIn = false;

        wrapper = shallow(<NavbarContainer location={location} signedIn={signedIn} />);
        navbarWrapper = wrapper.find(Navbar);
      });

      test('NavbarContainer contains one Navbar component', () => {
        expect(navbarWrapper).toHaveProperty('length', 1);
      });

      test('Display type of NavbarContainer is ONLY_LOGO', () => {
        expect(navbarWrapper.props()).toHaveProperty('displayType', DISPLAY_TYPE.ONLY_LOGO);
      });

      test('Button type of NavbarContainer is NONE', () => {
        expect(navbarWrapper.props()).toHaveProperty('buttonType', BUTTON_TYPE.NONE);
      });
    });
  });
});
