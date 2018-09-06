import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import ShowHideTextView from '.';

beforeAll(() => {
  configure({ adapter: new Adapter() });
});

const isDropDownTextVisible = component => !component.find('.show-hide-drop-down-text').hasClass('display-none');
const clickLabelContainer = component => component.find('.show-hide-label-container').simulate('click');
const clickDropDownText = component => component.find('.show-hide-drop-down-text').simulate('click');

describe('ShowHideTextView component', () => {
  let wrapper;
  const getWrapper = props => shallow(<ShowHideTextView {...props} />);

  describe('initial state', () => {
    beforeEach(() => {
      wrapper = getWrapper({
        label: 'this is the label',
        dropDownText: 'this is the inner text',
        className: 'some-class',
      });
    });

    test('should have label text and dropdown text', () => {
      expect(wrapper.find('.show-hide-label').text()).toEqual('this is the label');
      expect(wrapper.find('.show-hide-drop-down-text').text()).toEqual('this is the inner text');
    });

    test('dropdown text should be hidden initially', () => {
      expect(isDropDownTextVisible(wrapper)).toEqual(false);
    });

    test('dropdown text should be visible after first click', () => {
      clickLabelContainer(wrapper);
      expect(isDropDownTextVisible(wrapper)).toEqual(true);
    });

    test('dropdown text should be hidden again after two clicks', () => {
      clickLabelContainer(wrapper);
      clickLabelContainer(wrapper);
      expect(isDropDownTextVisible(wrapper)).toEqual(false);
    });

    test('dropdown text should not be hidden when clicked on', () => {
      clickLabelContainer(wrapper);
      clickDropDownText(wrapper);
      expect(isDropDownTextVisible(wrapper)).toEqual(true);
    });
  });
});
