import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { TextInput } from '.';

beforeAll(() => {
  configure({ adapter: new Adapter() });
});

describe('TextInput component', () => {
  let wrapper;
  const getWrapper = props => shallow(<TextInput {...props} />);

  const value = 'some text';

  describe('text', () => {
    const props = {
      value,
      placeholder: 'some placeholder',
      label: 'some label',
      name: 'some name',
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

  describe('error', () => {
    const props = {
      value,
      label: 'some label',
      name: 'some name',
    };

    describe('when there is an error', () => {
      beforeEach(() => {
        props.error = { message: 'something went horribly wrong' };
        wrapper = getWrapper(props);
      });

      describe('when showErrorMessage is true', () => {
        beforeEach(() => {
          props.showErrorMessage = true;
          wrapper = getWrapper(props);
        });

        it('input class is error', () => {
          expect(wrapper.find('input').hasClass('error')).toBeTruthy();
        });

        it('input contains error message', () => {
          expect(wrapper.find('p').text()).toBe('something went horribly wrong');
        });
      });

      describe('when showErrorMessage is false', () => {
        beforeEach(() => {
          props.showErrorMessage = false;
          wrapper = getWrapper(props);
        });

        it('input class is error', () => {
          expect(wrapper.find('input').hasClass('error')).toBeTruthy();
        });

        it('input contains error message', () => {
          expect(wrapper.find('p')).toHaveProperty('length', 0);
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

  describe('disabled', () => {
    const props = {
      value,
      label: 'some label',
      name: 'some name',
    };

    describe('when the input is disabled', () => {
      beforeEach(() => {
        props.disabled = true;
        wrapper = getWrapper(props);
      });

      it('input class contains disabled property', () => {
        expect(wrapper.find('input').props()).toHaveProperty('disabled', true);
      });
    });

    describe('when the input is not disabled', () => {
      beforeEach(() => {
        props.disabled = false;
        wrapper = getWrapper(props);
      });

      it('input class does not contain disabled property', () => {
        expect(wrapper.find('input').props()).not.toHaveProperty('disabled', true);
      });
    });

    describe('when disabled is not specified', () => {
      beforeEach(() => {
        wrapper = getWrapper(props);
      });

      it('input class does not contain disabled property', () => {
        expect(wrapper.find('input').props()).not.toHaveProperty('disabled', true);
      });
    });
  });

  describe('onChange', () => {
    let newValue = '';
    const event = { target: { value: 'another text' } };
    const onChange = (e) => { newValue = e; };
    const props = {
      label: 'some label',
      name: 'some name',
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

  describe('onBlur', () => {
    let blur = false;
    const onBlur = () => { blur = true; };
    const props = {
      label: 'some label',
      onBlur,
      name: 'some name',
    };

    beforeEach(() => {
      wrapper = getWrapper(props);
    });

    it('onBlur is called when focus is lost', () => {
      wrapper.find('input').simulate('blur');
      expect(blur).toBeTruthy();
    });
  });
});
