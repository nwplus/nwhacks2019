import React from 'react';
import { shallow, mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Redirect } from 'react-router-dom';

import HackerApplication from './Hacker';
import { ProgressGroup, SecondaryButton, PrimaryButton } from '../../input/buttons';

beforeAll(() => {
  configure({ adapter: new Adapter() });
});

describe('Hacker component', () => {
  const COUNT = 10;
  const ACTIVE_INDEX = 8;
  const LAST_VALID_INDEX = 9;

  const props = {
    hackerApplication: {
      isSubmitted: false,
      firstName: '',
      lastName: '',
      email: '',
    },
    count: COUNT,
    activeIndex: ACTIVE_INDEX,
    lastValidIndex: LAST_VALID_INDEX,
    onPageChange: jest.fn(),
    onPageBack: jest.fn(),
    onPageNext: jest.fn(),
    onHackerApplicationChange: jest.fn(),
    cancelHackerApplication: jest.fn(),
    cancelled: false,
    isNextButtonEnabled: false,
    updateNextButtonState: jest.fn(),
  };
  let wrapper;

  describe('when hacker application is cancelled', () => {
    const getWrapper = () => shallow(
      <HackerApplication {...props} />
    );

    beforeEach(() => {
      props.cancelled = true;

      wrapper = getWrapper();
    });

    it('redirects to home page', () => {
      expect(wrapper.find(Redirect).props()).toHaveProperty('to', '/');
    });
  });

  describe('when hacker application is not cancelled', () => {
    beforeEach(() => {
      props.cancelled = false;
    });

    describe('when hacker application is already submitted', () => {
      const getWrapper = () => shallow(
        <HackerApplication {...props} />
      );

      beforeEach(() => {
        const { hackerApplication } = props;
        hackerApplication.isSubmitted = true;

        wrapper = getWrapper();
      });

      it('redirects to dashboard', () => {
        expect(wrapper.find(Redirect).props()).toHaveProperty('to', '/dashboard');
      });
    });

    describe('when hacker application has not been submitted', () => {
      const getWrapper = () => mount(
        <HackerApplication {...props} />
      );

      beforeEach(() => {
        const { hackerApplication } = props;
        hackerApplication.isSubmitted = false;
        wrapper = getWrapper();
      });

      it('does not redirect', () => {
        expect(wrapper.find(Redirect)).toHaveLength(0);
      });

      describe('progress group', () => {
        let progressGroup;
        let progressGroupProps;

        beforeEach(() => {
          progressGroup = wrapper.find(ProgressGroup);
          progressGroupProps = progressGroup.props();
        });

        it('renders progress group', () => {
          expect(progressGroup).toHaveLength(1);
        });

        it('has correct count', () => {
          expect(progressGroupProps).toHaveProperty('count', COUNT);
        });

        it('has correct active index', () => {
          expect(progressGroupProps).toHaveProperty('activeIndex', ACTIVE_INDEX);
        });

        it('has correct last valid index', () => {
          expect(progressGroupProps).toHaveProperty('lastValidIndex', LAST_VALID_INDEX);
        });

        it('buttons beyond last valid index are disabled', () => {
          for (let i = 0; i < props.count; i += 1) {
            if (i <= props.lastValidIndex) {
              expect(progressGroup.find('button').at(i).props().disabled).toBeFalsy();
            } else {
              expect(progressGroup.find('button').at(i).props().disabled).toBeTruthy();
            }
          }
        });

        describe('when clicking buttons', () => {
          describe('when clicking a valid button', () => {
            it('onPagechange is called with the page number', () => {
              for (let i = 0; i <= props.lastValidIndex; i += 1) {
                progressGroup.find('button').at(i).simulate('click');
                expect(props.onPageChange).toHaveBeenCalledWith(i);
              }
            });
          });
        });
      });

      describe('secondary button', () => {
        it('text matches active index', () => {
          for (let i = 0; i < props.count; i += 1) {
            props.activeIndex = i;
            wrapper = getWrapper();

            if (i === 0) {
              expect(wrapper.find(SecondaryButton).text()).toEqual('Cancel');
            } else {
              expect(wrapper.find(SecondaryButton).text()).toEqual('Back');
            }
          }
        });

        describe('on click', () => {
          beforeEach(() => {
            const { count } = props;
            props.lastValidIndex = count - 1;
          });

          it('calls corresponding callback function on click', () => {
            for (let i = 0; i <= props.count; i += 1) {
              props.activeIndex = i;
              wrapper = getWrapper();

              wrapper.find(SecondaryButton).simulate('click');

              if (i === 0) {
                expect(props.cancelHackerApplication).toHaveBeenCalled();
              } else {
                expect(props.onPageBack).toHaveBeenCalled();
              }

              props.onPageBack.mockClear();
              props.cancelHackerApplication.mockClear();
            }
          });
        });
      });

      describe('primary button', () => {
        it('text matches active index', () => {
          for (let i = 0; i < props.count; i += 1) {
            props.activeIndex = i;
            wrapper = getWrapper();

            if (i === props.count - 1) {
              expect(wrapper.find(PrimaryButton).text()).toEqual('Submit application');
            } else if (i === props.count - 2) {
              expect(wrapper.find(PrimaryButton).text()).toEqual('One last step');
            } else {
              expect(wrapper.find(PrimaryButton).text()).toEqual('Next');
            }
          }
        });

        describe('on click', () => {
          beforeEach(() => {
            const { count } = props;
            props.lastValidIndex = count - 1;
          });

          describe('when next page button is enabled', () => {
            beforeEach(() => {
              props.isNextButtonEnabled = true;
            });

            it('calls onPageNext when it is not the last page', () => {
              for (let i = 0; i <= props.count; i += 1) {
                props.activeIndex = i;
                wrapper = getWrapper();
                wrapper.find(PrimaryButton).simulate('click');

                if (i !== props.count - 1) {
                  expect(props.onPageNext).toHaveBeenCalled();
                } else {
                  expect(props.onPageNext).not.toHaveBeenCalled();
                }

                props.onPageNext.mockClear();
              }
            });
          });

          describe('when next page button is not enabled', () => {
            beforeEach(() => {
              props.isNextButtonEnabled = false;
            });

            it('does not call onPageNext', () => {
              for (let i = 0; i <= props.count; i += 1) {
                props.activeIndex = i;
                wrapper = getWrapper();
                wrapper.find(PrimaryButton).simulate('click');
                expect(props.onPageNext).not.toHaveBeenCalled();

                props.onPageNext.mockClear();
              }
            });
          });
        });
      });

      describe('pages', () => {
        describe('when active index is 0', () => {
          beforeEach(() => {
            props.activeIndex = 0;
            wrapper = getWrapper();
          });

          it('page one is rendered', () => {
            expect(wrapper.find('div#hacker-application-page-1')).toHaveLength(1);
          });

          describe('text input', () => {
            let textInput;

            beforeEach(() => {
              textInput = wrapper.find('input');
            });

            it('calls onHackerApplicationChange when input changes', () => {
              textInput.simulate('change');
              const { onHackerApplicationChange } = props;
              expect(onHackerApplicationChange).toHaveBeenCalled();
            });
          });
        });

        describe('when active index is 1', () => {
          beforeEach(() => {
            props.activeIndex = 1;

            wrapper = getWrapper();
          });

          it('page two is rendered', () => {
            expect(wrapper.find('div#hacker-application-page-2')).toHaveLength(1);
          });

          describe('text input', () => {
            let textInput;

            beforeEach(() => {
              textInput = wrapper.find('input');
            });

            it('calls onHackerApplicationChange when input changes', () => {
              textInput.simulate('change');
              const { onHackerApplicationChange } = props;
              expect(onHackerApplicationChange).toHaveBeenCalled();
            });
          });
        });
      });
    });
  });
});
