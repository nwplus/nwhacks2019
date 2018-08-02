import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import AfterLogin from '../../components/auth/Login/AfterLogin';
import { AfterLoginContainer } from './AfterLogin';

beforeAll(() => {
  configure({ adapter: new Adapter() });
});

describe('AfterLoginContainer', () => {
  let props;
  let wrapper;
  const getWrapper = () => shallow(<AfterLoginContainer {...props} />);

  describe('when hacker application is loaded', () => {
    describe('when data is not undefined', () => {
      const action = jest.fn();

      beforeEach(() => {
        const hackerApplication = { isLoaded: true, data: { a: 'b' } };

        props = {
          hackerApplication,
          storeHackerApplication: action,
        };

        wrapper = getWrapper();
      });

      it('isLoaded is true in AfterLogin component', () => {
        expect(wrapper.find(AfterLogin).props()).toHaveProperty('isLoaded', true);
      });

      describe('when unmounted', () => {
        beforeEach(() => {
          wrapper.unmount();
        });

        it('storeHackerApplication action is called', () => {
          expect(action.mock.calls).toHaveLength(1);
          expect(action.mock.calls[0][0]).toEqual({ isLoaded: true, data: { a: 'b' } });
        });
      });
    });

    describe('when data is undefined', () => {
      const action = jest.fn();

      beforeEach(() => {
        const hackerApplication = { isLoaded: true, data: undefined };

        props = {
          hackerApplication,
          storeHackerApplication: action,
        };

        wrapper = getWrapper();
      });

      it('isLoaded is true in AfterLogin component', () => {
        expect(wrapper.find(AfterLogin).props()).toHaveProperty('isLoaded', true);
      });

      describe('when unmounted', () => {
        beforeEach(() => {
          wrapper.unmount();
        });

        it('storeHackerApplication action is called', () => {
          expect(action.mock.calls).toHaveLength(1);
          expect(action.mock.calls[0][0]).toEqual({ isLoaded: true, data: undefined });
        });
      });
    });
  });

  describe('when hacker application is not loaded', () => {
    const action = jest.fn();

    beforeEach(() => {
      const hackerApplication = { isLoaded: false, data: undefined };

      props = {
        hackerApplication,
        storeHackerApplication: action,
      };

      wrapper = getWrapper();
    });

    it('isLoaded is true in AfterLogin component', () => {
      expect(wrapper.find(AfterLogin).props()).toHaveProperty('isLoaded', false);
    });

    describe('when unmounted', () => {
      beforeEach(() => {
        wrapper.unmount();
      });

      it('storeHackerApplication action is not called', () => {
        expect(action.mock.calls).toHaveLength(0);
      });
    });
  });
});
