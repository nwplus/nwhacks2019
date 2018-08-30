import React from 'react';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import SignUp from './SignUp';
import { TextInput, PasswordInput } from '../../../input/text';

beforeAll(() => {
  configure({ adapter: new Adapter() });
});

describe('Sign up component', () => {
  let wrapper;
  const props = {
    hackerApplication: {
      isSubmitted: false,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
    },
    onHackerApplicationChange: jest.fn(),
    updateNextButtonState: jest.fn(),
    disableNextButton: jest.fn(),
  };
  const getWrapper = () => mount(<SignUp {...props} />);

  beforeEach(() => {
    wrapper = getWrapper();
  });

  describe('initial state', () => {
    it('passwords are empty strings', () => {
      wrapper.find(PasswordInput).forEach((node) => {
        expect(node.find('input').text()).toEqual('');
      });
    });

    it('disable email input initially', () => {
      expect(wrapper.find(TextInput).props()).toHaveProperty('disabled', true);
    });

    it('email text input contains email from hacker application email', () => {
      expect(wrapper.find(TextInput).props()).toHaveProperty('value', 'john.doe@example.com');
    });

    it('passwords have an error, but they do not display the error', () => {
      wrapper.find(PasswordInput).forEach((node) => {
        expect(node.props()).toHaveProperty('error', { message: 'Password is empty' });
        expect(node.props()).toHaveProperty('showErrorMessage', false);
        expect(node.props()).toHaveProperty('showError', false);
      });
    });
  });

  describe('onEmailChange', () => {
    it('calls onHackerApplicationChange with new email', () => {
      wrapper.instance().onEmailChange('jane.doe@example.com');
      const { onHackerApplicationChange } = props;
      expect(onHackerApplicationChange).toHaveBeenCalledWith({
        isSubmitted: false,
        firstName: 'John',
        lastName: 'Doe',
        email: 'jane.doe@example.com',
      });
    });
  });

  describe('password validation', () => {
    describe('when passwords don\'t match', () => {
      beforeEach(() => {
        wrapper = getWrapper();

        wrapper.instance().onPasswordChange('abcd');
        wrapper.instance().onPasswordConfirmationChange('abcde');
      });

      describe('when user has clicked out of the password confirmation input', () => {
        beforeEach(() => {
          wrapper.instance().onPasswordConfirmationBlur();
          wrapper.update();
        });

        it('password inputs display the error', () => {
          wrapper.find(PasswordInput).forEach((node) => {
            expect(node.props()).toHaveProperty('error', { message: 'Passwords do not match' });
            expect(node.props()).toHaveProperty('showError', true);
          });
        });
      });

      describe('when user has not clicked out of the password confirmation input', () => {
        beforeEach(() => {
          wrapper.update();
        });

        it('password inputs display the error', () => {
          wrapper.find(PasswordInput).forEach((node) => {
            expect(node.props()).toHaveProperty('error', { message: 'Passwords do not match' });
            expect(node.props()).toHaveProperty('showError', false);
          });
        });
      });
    });

    describe('when password is empty', () => {
      beforeEach(() => {
        wrapper = getWrapper();

        wrapper.instance().onPasswordChange('');
        wrapper.instance().onPasswordConfirmationChange('');
      });

      describe('when user has clicked out of the password confirmation input', () => {
        beforeEach(() => {
          wrapper.instance().onPasswordConfirmationBlur();
          wrapper.update();
        });

        it('password inputs display the error', () => {
          wrapper.find(PasswordInput).forEach((node) => {
            expect(node.props()).toHaveProperty('error', { message: 'Password is empty' });
            expect(node.props()).toHaveProperty('showError', true);
          });
        });
      });

      describe('when user has not clicked out of the password confirmation input', () => {
        beforeEach(() => {
          wrapper.update();
        });

        it('password inputs display the error', () => {
          wrapper.find(PasswordInput).forEach((node) => {
            expect(node.props()).toHaveProperty('error', { message: 'Password is empty' });
            expect(node.props()).toHaveProperty('showError', false);
          });
        });
      });
    });

    describe('when passwords match', () => {
      beforeEach(() => {
        wrapper = getWrapper();

        wrapper.instance().onPasswordChange('abcdefg');
        wrapper.instance().onPasswordConfirmationChange('abcdefg');
      });

      describe('when user has clicked out of the password confirmation input', () => {
        beforeEach(() => {
          wrapper.instance().onPasswordConfirmationBlur();
          wrapper.update();
        });

        it('password inputs don\'t have an error', () => {
          wrapper.find(PasswordInput).forEach((node) => {
            expect(node.props()).toHaveProperty('error', null);
            expect(node.props()).toHaveProperty('showError', true);
          });
        });
      });

      describe('when user has not clicked out of the password confirmation input', () => {
        beforeEach(() => {
          wrapper.update();
        });

        it('password inputs don\'t have an error', () => {
          wrapper.find(PasswordInput).forEach((node) => {
            expect(node.props()).toHaveProperty('error', null);
            expect(node.props()).toHaveProperty('showError', false);
          });
        });
      });
    });
  });

  describe('onSideLinkClick', () => {
    describe('when email input is disabled', () => {
      beforeEach(() => {
        wrapper.setState({ isEmailDisabled: true });
      });

      it('enables the email input', () => {
        wrapper.instance().onSideLinkClick();
        wrapper.update();
        expect(wrapper.find(TextInput).props()).toHaveProperty('disabled', false);
      });
    });

    describe('when email input is enabled', () => {
      beforeEach(() => {
        wrapper.setState({ isEmailDisabled: false });
      });

      it('disables the email input', () => {
        wrapper.instance().onSideLinkClick();
        wrapper.update();
        expect(wrapper.find(TextInput).props()).toHaveProperty('disabled', true);
      });
    });
  });

  describe('updateNextButtonState', () => {
    describe('when password changes', () => {
      describe('when passwords match', () => {
        beforeEach(() => {
          wrapper.setState({ passwordConfirmation: '1234' });
        });

        it('enables next button', () => {
          wrapper.instance().onPasswordChange('1234');
          wrapper.update();
          const { updateNextButtonState } = props;
          expect(updateNextButtonState).toHaveBeenCalledWith(true);
        });
      });

      describe('when passwords don\'t match', () => {
        beforeEach(() => {
          wrapper.setState({ passwordConfirmation: '1234' });
        });

        it('disables next button', () => {
          wrapper.instance().onPasswordChange('12345');
          wrapper.update();
          const { updateNextButtonState } = props;
          expect(updateNextButtonState).toHaveBeenCalledWith(false);
        });
      });

      describe('when passwords are empty', () => {
        beforeEach(() => {
          wrapper.setState({ passwordConfirmation: '' });
        });

        it('disables next button', () => {
          wrapper.instance().onPasswordChange('');
          wrapper.update();
          const { updateNextButtonState } = props;
          expect(updateNextButtonState).toHaveBeenCalledWith(false);
        });
      });
    });

    describe('when password confirmation changes', () => {
      describe('when passwords match', () => {
        beforeEach(() => {
          wrapper.setState({ password: '1234' });
        });

        it('enables next button', () => {
          wrapper.instance().onPasswordConfirmationChange('1234');
          wrapper.update();
          const { updateNextButtonState } = props;
          expect(updateNextButtonState).toHaveBeenCalledWith(true);
        });
      });

      describe('when passwords don\'t match', () => {
        beforeEach(() => {
          wrapper.setState({ password: '1234' });
        });

        it('disables next button', () => {
          wrapper.instance().onPasswordConfirmationChange('12345');
          wrapper.update();
          const { updateNextButtonState } = props;
          expect(updateNextButtonState).toHaveBeenCalledWith(false);
        });
      });

      describe('when passwords are empty', () => {
        beforeEach(() => {
          wrapper.setState({ password: '' });
        });

        it('disables next button', () => {
          wrapper.instance().onPasswordConfirmationChange('');
          wrapper.update();
          const { updateNextButtonState } = props;
          expect(updateNextButtonState).toHaveBeenCalledWith(false);
        });
      });
    });
  });
});
