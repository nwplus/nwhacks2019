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
      beforeEach(() => {
        const hackerApplication = { isLoaded: true, data: { a: 'b' } };

        props = {
          hackerApplication,
          storeHackerApplication: jest.fn(),
          resetState: jest.fn(),
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
          const { storeHackerApplication } = props;
          expect(storeHackerApplication.mock.calls).toHaveLength(1);
          expect(storeHackerApplication.mock.calls[0][0]).toEqual({ a: 'b' });
        });

        it('resets state', () => {
          const { resetState } = props;
          expect(resetState).toHaveBeenCalled();
        });
      });
    });

    describe('when data is undefined', () => {
      const hackerApplication = { isLoaded: true, data: undefined };

      beforeEach(() => {
        props = {
          hackerApplication,
          storeHackerApplication: jest.fn(),
          resetState: jest.fn(),
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

        it('storeHackerApplication action is not called', () => {
          const { storeHackerApplication } = props;
          expect(storeHackerApplication).not.toHaveBeenCalled();
        });

        it('resets state', () => {
          const { resetState } = props;
          expect(resetState).toHaveBeenCalled();
        });
      });
    });
  });

  describe('when hacker application is not loaded', () => {
    beforeEach(() => {
      const hackerApplication = { isLoaded: false, data: undefined };

      props = {
        hackerApplication,
        storeHackerApplication: jest.fn(),
        resetState: jest.fn(),
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
        const { storeHackerApplication } = props;
        expect(storeHackerApplication).not.toHaveBeenCalled();
      });

      it('does not reset state', () => {
        const { resetState } = props;
        expect(resetState).not.toHaveBeenCalled();
      });
    });
  });
});
