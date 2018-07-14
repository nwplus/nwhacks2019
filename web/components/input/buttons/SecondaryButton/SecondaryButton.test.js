import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import SecondaryButton from '.';

beforeAll(() => {
  configure({ adapter: new Adapter() });
});

describe('SecondaryButton component', () => {
  let clicked;
  let wrapper;
  const getWrapper = props => shallow(<SecondaryButton {...props} />);

  describe('when the button is enabled', () => {
    beforeEach(() => {
      clicked = false;
      wrapper = getWrapper({
        text: 'hello cham',
        onClick: () => { clicked = true; },
        disabled: false,
      });
    });

    test('should have text', () => {
      expect(wrapper.text()).toEqual('hello cham');
    });

    test('should be clickable', () => {
      wrapper.find('button').simulate('click');
      expect(clicked).toBeTruthy();
    });
  });

  describe('when the button is disabled', () => {
    beforeEach(() => {
      clicked = false;
      wrapper = getWrapper({
        text: 'hello cham',
        onClick: () => { clicked = true; },
        disabled: true,
      });
    });

    test('should have text', () => {
      expect(wrapper.text()).toEqual('hello cham');
    });

    test('should not be clickable', () => {
      expect(wrapper.find('button').props().disabled).toBeTruthy();

      // Enzyme click simulations do not respect 'disabled' attribute.
      // See https://github.com/airbnb/enzyme/issues/386
      // wrapper.find('button').simulate('click');
      // expect(clicked).toBeFalsy();
    });
  });
});
