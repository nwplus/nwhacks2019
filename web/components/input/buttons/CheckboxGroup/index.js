import React from 'react';
import PropTypes from 'prop-types';

const InputContext = React.createContext({});

const Checkbox = ({ name, value, label, checked, disabled, onChange }) => (
  <InputContext.Consumer>
    {context => (
      <label className="checkbox">
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

  // onChange functional
  onChange: PropTypes.func,

  // determines if checkbox is selected
  checked: PropTypes.bool,

  // determines if checkbox is disabled
  disabled: PropTypes.bool,
};

const CheckboxGroup = props => (
  <InputContext.Provider value={props}>
    <div>{props.children}</div>
  </InputContext.Provider>
);

export {
  Checkbox,
  CheckboxGroup,
};
