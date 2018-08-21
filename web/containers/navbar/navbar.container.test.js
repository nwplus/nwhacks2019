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
  let wrapper;
  let navbarWrapper;
  const props = {
    signedIn: true,
    location: {
      pathname: '/',
    },
    featureFlags: {
      isLoaded: true,
      data: {
        application: {
          enabled: true,
        },
      },
    },
  };

  const getWrapper = () => shallow(
    <NavbarContainer {...props} />
  );

  describe('when feature flags are not loaded', () => {
    beforeEach(() => {
      const { featureFlags } = props;
      featureFlags.isLoaded = false;

      wrapper = getWrapper();
    });

    it('does not render anything', () => {
      expect(wrapper.getElement()).toBe(null);
    });
  });

  describe('when feature flags are loaded', () => {
    beforeEach(() => {
      const { featureFlags } = props;
      featureFlags.isLoaded = true;
    });

    describe('when application feature flag is enabled', () => {
      beforeEach(() => {
        const { featureFlags } = props;
        featureFlags.data.application.enabled = true;
      });

      describe('when the location is home page', () => {
        beforeEach(() => {
          props.location = {
            pathname: '/',
          };
        });

        describe('when user is signed in', () => {
          beforeEach(() => {
            props.signedIn = true;

            wrapper = getWrapper();
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
            props.signedIn = false;

            wrapper = getWrapper();
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
          props.location = {
            pathname: '/dashboard',
          };
        });

        describe('when user is signed in', () => {
          beforeEach(() => {
            props.signedIn = true;

            wrapper = getWrapper();
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
          props.location = {
            pathname: '/some_page',
          };
        });

        describe('when user is signed in', () => {
          beforeEach(() => {
            props.signedIn = true;

            wrapper = getWrapper();
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
            props.signedIn = false;

            wrapper = getWrapper();
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

    describe('when application feature flag is disabled', () => {
      beforeEach(() => {
        const { featureFlags } = props;
        featureFlags.data.application.enabled = false;
      });

      describe('when the location is home page', () => {
        beforeEach(() => {
          const { location } = props;
          location.pathname = '/';
          wrapper = getWrapper();
          navbarWrapper = wrapper.find(Navbar);
        });

        test('NavbarContainer contains one Navbar component', () => {
          expect(navbarWrapper).toHaveProperty('length', 1);
        });

        test('Display type of NavbarContainer is LOGO_AND_LINKS', () => {
          expect(navbarWrapper.props()).toHaveProperty('displayType', DISPLAY_TYPE.LOGO_AND_LINKS);
        });
      });

      describe('when the location is not home page', () => {
        beforeEach(() => {
          const { location } = props;
          location.pathname = '/random_page';
          wrapper = getWrapper();
          navbarWrapper = wrapper.find(Navbar);
        });

        test('NavbarContainer contains one Navbar component', () => {
          expect(navbarWrapper).toHaveProperty('length', 1);
        });

        test('Display type of NavbarContainer is ONLY_LOGO', () => {
          expect(navbarWrapper.props()).toHaveProperty('displayType', DISPLAY_TYPE.ONLY_LOGO);
        });
      });
    });
  });
});
