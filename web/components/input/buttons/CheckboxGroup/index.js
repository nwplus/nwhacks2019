import React from 'react';
import PropTypes from 'prop-types';
import { concatClassName } from '../../../utils';

const InputContext = React.createContext({});

const Checkbox = ({ name, value, label, className, checked, disabled, onChange }) => (
  <InputContext.Consumer>
    {context => (
      <div className={concatClassName('checkbox', (className || context.sharedClassName))}>
        <label>
          <input
            type="checkbox"
            name={name || context.name}
            value={value}
            defaultChecked={checked || context.checked}
            disabled={disabled || context.disabled}
            onChange={onChange || context.onChange}
          />
          <span className="checkmark" />
          <span className="label-text">{label}</span>
        </label>
      </div>
    )}
  </InputContext.Consumer>
);

Checkbox.propTypes = {
  // name should be the same amongst checkboxes in a checkbox group
  name: PropTypes.string,
  // input value for checkbox
  value: PropTypes.string.isRequired,
  // label text for checkbox
  label: PropTypes.string.isRequired,
  // extra CSS classes to apply to the checkbox
  className: PropTypes.string,
  // determines if checkbox is selected
  checked: PropTypes.bool,
  // determines if checkbox is disabled
  disabled: PropTypes.bool,
  // onChange functional
  onChange: PropTypes.func,
};

const CheckboxGroup = (props) => {
  const { children, className } = props;
  return (
    <InputContext.Provider value={props}>
      <div className={concatClassName('checkbox-group', className)}>{children}</div>
    </InputContext.Provider>
  );
};

CheckboxGroup.propTypes = {
  // can contain one or many Checkbox components
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.array,
  ]),
  // extra CSS class names for the container (not applied to children)
  className: PropTypes.string,
  /* Additional optional parameters implicitly passed down to children

      // see Checkbox.propTypes
      name,
      value,
      defaultChecked,
      disabled,
      onChange,

      // passed down to all children (but not applied to container)
      sharedClassName: PropTypes.string,
  */
};

export {
  Checkbox,
  CheckboxGroup,
};
