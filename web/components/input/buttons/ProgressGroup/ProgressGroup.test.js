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
        expect(wrapper.find('button').at(i).text()).toEqual((i + 1).toString());
      }
    });

    test('all buttons should be clickable', () => {
      for (let i = 0; i < count; i += 1) {
        wrapper.find('button').at(i).simulate('click');
        expect(clicked).toEqual(i);
      }
    });

    test('active button should have class "active"', () => {
      for (let i = 0; i < count; i += 1) {
        if (i === activeIndex) {
          expect(wrapper.find('button').at(i).hasClass('active')).toBeTruthy();
        } else {
          expect(wrapper.find('button').at(i).hasClass('active')).toBeFalsy();
        }
      }
    });
  });

  describe('when some steps are disabled', () => {
    const count = 6;
    const activeIndex = 1;
    const lastValidIndex = count / 2;

    beforeEach(() => {
      clicked = undefined;
      wrapper = getWrapper({
        count,
        onClick: (i) => { clicked = i; },
        activeIndex,
        lastValidIndex,
      });
    });

    test('all buttons should be instantiated', () => {
      for (let i = 0; i < count; i += 1) {
        expect(wrapper.find('button').at(i).text()).toEqual((i + 1).toString());
      }
    });

    test('some buttons should not be clickable', () => {
      for (let i = 0; i < count; i += 1) {
        wrapper.find('button').at(i).simulate('click');
        if (i <= lastValidIndex) {
          expect(clicked).toEqual(i);
          expect(wrapper.find('button').at(i).props().disabled).toBeFalsy();
        } else {
          expect(wrapper.find('button').at(i).props().disabled).toBeTruthy();

          // Enzyme click simulations do not respect 'disabled' attribute.
          // See https://github.com/airbnb/enzyme/issues/386
          // expect(clicked).not.toEqual(i)
        }
      }
    });

    test('inactive buttons should not have class "active"', () => {
      for (let i = 0; i < count; i += 1) {
        if (i === activeIndex) {
          expect(wrapper.find('button').at(i).hasClass('active')).toBeTruthy();
        } else {
          expect(wrapper.find('button').at(i).hasClass('active')).toBeFalsy();
        }
      }
    });
  });
});
