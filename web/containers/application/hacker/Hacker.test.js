import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import HackerApplication from '../../../components/application/hacker/Hacker';
import { HackerApplicationContainer } from './Hacker';

beforeAll(() => {
  configure({ adapter: new Adapter() });
});

describe('HackerContainer', () => {
  const props = {
    hackerApplication: {
      isSubmitted: false,
      firstName: 'John',
      lastName: 'Doe',
    },
    activeIndex: 99,
    lastValidIndex: 100,
    changePage: jest.fn(),
    changeLastActiveIndex: jest.fn(),
    updateApplication: jest.fn(),
    cancelApplication: jest.fn(),
    featureFlags: {
      isLoaded: true,
      data: {
        application: {
          enabled: true,
        },
      },
    },
  };

  let wrapper;
  const getWrapper = () => shallow(<HackerApplicationContainer {...props} />);

  describe('when feature flag is not loaded', () => {
    beforeEach(() => {
      const { featureFlags } = props;
      featureFlags.isLoaded = false;

      wrapper = getWrapper();
    });

    it('renders null', () => {
      expect(wrapper.getElement()).toBe(null);
    });
  });

  describe('when feature flag is loaded', () => {
    beforeEach(() => {
      const { featureFlags } = props;
      featureFlags.isLoaded = true;
    });

    describe('when application feature flag is enabled', () => {
      beforeEach(() => {
        const { featureFlags } = props;
        featureFlags.data.application.enabled = true;
      });

      describe('with given props', () => {
        let componentProps;

        beforeEach(() => {
          wrapper = getWrapper();
          componentProps = wrapper.find(HackerApplication).props();
        });

        it('initial state includes property cancelled as false', () => {
          expect(wrapper.state('cancelled')).toBeFalsy();
        });

        it('passes hacker application to the component', () => {
          expect(componentProps).toHaveProperty('hackerApplication', {
            isSubmitted: false,
            firstName: 'John',
            lastName: 'Doe',
          });
        });

        it('passes active index to the component', () => {
          expect(componentProps).toHaveProperty('activeIndex', 99);
        });

        it('passes last valid index to the component', () => {
          expect(componentProps).toHaveProperty('lastValidIndex', 100);
        });
      });

      describe('when changing pages', () => {
        describe('when active page is smaller than last valid page', () => {
          beforeEach(() => {
            wrapper = getWrapper();
          });

          describe('onPageNext', () => {
            it('changePage is called with the next page', () => {
              wrapper.instance().onPageNext();
              const { changePage } = props;
              expect(changePage).toHaveBeenCalledWith(100);
            });
          });

          describe('onPageBack', () => {
            it('changePage is called with the next page', () => {
              wrapper.instance().onPageBack();
              const { changePage } = props;
              expect(changePage).toHaveBeenCalledWith(98);
            });
          });
        });

        describe('when active page is greater or equal to last valid page', () => {
          beforeEach(() => {
            props.activeIndex = 100;

            wrapper = getWrapper();
          });

          describe('onPageNext', () => {
            it('changePage is called with the next page', () => {
              wrapper.instance().onPageNext();
              const { changePage } = props;
              expect(changePage).toHaveBeenCalledWith(101);
            });

            it('changeLastActiveIndex is called with the next page', () => {
              wrapper.instance().onPageNext();
              const { changeLastActiveIndex } = props;
              expect(changeLastActiveIndex).toHaveBeenCalledWith(101);
            });
          });

          describe('onPageBack', () => {
            it('changePage is called with the next page', () => {
              wrapper.instance().onPageBack();
              const { changePage } = props;
              expect(changePage).toHaveBeenCalledWith(99);
            });
          });
        });
      });

      describe('when updating hacker application', () => {
        beforeEach(() => {
          wrapper = getWrapper();
        });

        it('calls updateApplication', () => {
          const newApp = {
            isSubmitted: false,
            firstName: 'Jake',
            lastName: 'Smith',
          };
          wrapper.instance().onHackerApplicationChange(newApp);
          const { updateApplication } = props;
          expect(updateApplication).toHaveBeenCalledWith(newApp);
        });
      });

      describe('when cancelling hacker application', () => {
        beforeEach(() => {
          wrapper = getWrapper();
        });

        it('calls updateApplication', () => {
          expect(wrapper.state('cancelled')).toBeFalsy();
          wrapper.instance().cancel();
          const { cancelApplication } = props;
          expect(cancelApplication).toHaveBeenCalled();
          expect(wrapper.state('cancelled')).toBeTruthy();
        });
      });
    });
  });
});
