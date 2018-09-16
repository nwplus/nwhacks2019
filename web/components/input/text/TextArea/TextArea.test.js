import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { TextArea } from '.';

beforeAll(() => {
  configure({ adapter: new Adapter() });
});

describe('TextArea component', () => {
  let wrapper;
  const getWrapper = props => shallow(<TextArea {...props} />);

  describe('textarea', () => {
    const props = {
      placeholder: 'some placeholder',
      label: 'some label',
      name: 'some name',
      maxWordCount: 5,
    };

    beforeEach(() => {
      wrapper = getWrapper(props);
    });

    it('textarea placeholder matches props placeholder', () => {
      expect(wrapper.find('textarea').props()).toHaveProperty('placeholder', 'some placeholder');
    });

    it('textarea label matches props label', () => {
      expect(wrapper.find('h5').text()).toBe('some label');
    });

    describe('word count', () => {
      describe('showWordCount flag', () => {
        it('word count is not visible', () => {
          props.showWordCount = false;
          wrapper = getWrapper(props);
          expect(wrapper.find('p').text()).toBe('');
        });

        it('word count is visible', () => {
          props.showWordCount = true;
          wrapper = getWrapper(props);
          expect(wrapper.find('p').text()).not.toBe('');
        });
      });
    });

    describe('word count limit', () => {
      beforeEach(() => {
        props.showWordCount = true;
        props.maxWordCount = 5;
        wrapper = getWrapper(props);
      });

      it('not exceeded', () => {
        expect(wrapper.find('textarea').hasClass('error')).toBeFalsy();
      });

      it('exceeded', () => {
        const event = { target: { value: 'This is more than five words.' } };
        wrapper.find('textarea').simulate('change', event);
        expect(wrapper.find('textarea').hasClass('error')).toBeTruthy();
      });
    });
  });
});
