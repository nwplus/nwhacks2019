import React from 'react';
import PropTypes from 'prop-types';

const Checkbox = ({ name, value, label, checked, disabled, onChange}) => (
  <label> 
    <input
      type="checkbox"
      name={name}
      value={value}
      defaultChecked={checked}
      disabled={disabled}
      onChange={onChange}
    />
    { label }
  </label>
);

Checkbox.propTypes = {
  // name should be the same amongst checkboxes in a checkbox group
  name: PropTypes.string.isRequired,

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

export default Checkbox;
