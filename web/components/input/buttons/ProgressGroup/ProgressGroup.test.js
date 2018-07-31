import React from 'react';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import ProgressGroup from '.';

beforeAll(() => {
  configure({ adapter: new Adapter() });
});

describe('ProgressGroup component', () => {
  let clicked;
  let wrapper;

  // Deep mount children of ProgressGroup
  const getWrapper = props => mount(<ProgressGroup {...props} />);

  describe('when all step are enabled', () => {
    const count = 3;
    const activeIndex = 1;
    beforeEach(() => {
      clicked = undefined;
      wrapper = getWrapper({
        count,
        onClick: (i) => { clicked = i; },
        activeIndex: 1,
        lastValidIndex: count,
      });
    });

    test('all buttons should be instantiated', () => {
      for (let i = 0; i < count; i += 1) {
        expect(wrapper.childAt(i).text()).toEqual((i + 1).toString());
      }
    });

    test('all buttons should be clickable', () => {
      for (let i = 0; i < count; i += 1) {
        wrapper.childAt(i).simulate('click');
        expect(clicked).toEqual(i);
      }
    });

    test('active button should have class "active"', () => {
      expect(wrapper.childAt(activeIndex).hasClass('active')).toBeTruthy();
    });
  });

  describe('when some steps are disabled', () => {
    const count = 4;
    const lastActiveIndex = 4;

    beforeEach(() => {
      clicked = undefined;
      wrapper = getWrapper({
        count,
        onClick: (i) => { clicked = i; },
        activeIndex: 1,
        lastActiveIndex: count / 2,
      });
    });

    test('all buttons should be instantiated', () => {
      for (let i = 0; i < count; i += 1) {
        expect(wrapper.childAt(i).text()).toEqual((i + 1).toString());
      }
    });

    test('some buttons should not be clickable', () => {
      for (let i = 0; i < count; i += 1) {
        wrapper.childAt(i).simulate('click');
        if (i <= lastActiveIndex) {
          expect(clicked).toEqual(i);
        } else {
          expect(wrapper.childAt(i).props().disabled).toBeTruthy();

          // Enzyme click simulations do not respect 'disabled' attribute.
          // See https://github.com/airbnb/enzyme/issues/386
          // expect(clicked).not.toEqual(i)
        }
      }
    });
  });
});
