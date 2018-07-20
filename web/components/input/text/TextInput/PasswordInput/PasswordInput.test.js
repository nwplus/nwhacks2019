import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { PasswordInput } from '.';

beforeAll(() => {
  configure({ adapter: new Adapter() });
});

describe('PasswordInput component', () => {
  let wrapper;
  const getWrapper = props => shallow(<PasswordInput {...props} />);

  const value = 'some text';

  describe('text', () => {
    const props = {
      value,
      placeholder: 'some placeholder',
      label: 'some label',
      id: 'some input',
    };

    beforeEach(() => {
      wrapper = getWrapper(props);
    });

    it('input value matches props value', () => {
      expect(wrapper.find('input').props()).toHaveProperty('value', 'some text');
    });

    it('input placeholder matches props placeholder', () => {
      expect(wrapper.find('input').props()).toHaveProperty('placeholder', 'some placeholder');
    });

    it('input label matches props label', () => {
      expect(wrapper.find('h5').text()).toBe('some label');
    });
  });

  describe('password', () => {
    const props = {
      value,
      label: 'some label',
      id: 'some input',
    };

    beforeEach(() => {
      wrapper = getWrapper(props);
    });

    it('input has password type', () => {
      expect(wrapper.find('input').props()).toHaveProperty('type', 'password');
    });
  });

  describe('error', () => {
    const props = {
      value,
      label: 'some label',
      id: 'some input',
    };

    describe('when there is an error', () => {
      beforeEach(() => {
        props.error = { message: 'something went horribly wrong' };
        wrapper = getWrapper(props);
      });

      it('input class is error', () => {
        expect(wrapper.find('input').hasClass('error')).toBeTruthy();
      });

      it('input contains error message', () => {
        expect(wrapper.find('p').length).toBe(0);
      });

      describe('when showErrorMessage is true', () => {
        beforeEach(() => {
          props.showErrorMessage = true;
          wrapper = getWrapper(props);
        });

        it('input contains error message', () => {
          expect(wrapper.find('p').text()).toBe('something went horribly wrong');
        });
      });
    });

    describe('when there is no error', () => {
      beforeEach(() => {
        props.error = null;
        wrapper = getWrapper(props);
      });

      it('input class does not have error', () => {
        expect(wrapper.find('input').hasClass('error')).toBeFalsy();
      });

      it('input does not contain error message', () => {
        expect(wrapper.find('p')).toHaveProperty('length', 0);
      });
    });
  });

  describe('onChange', () => {
    let newValue = '';
    const event = { target: { value: 'another text' } };
    const onChange = (e) => { newValue = e.target.value; };
    const props = {
      label: 'some label',
      id: 'some input',
      onChange,
    };

    beforeEach(() => {
      wrapper = getWrapper(props);
    });

    it('onChange is called when value is changed', () => {
      wrapper.find('input').simulate('change', event);
      expect(newValue).toEqual('another text');
    });
  });
});
