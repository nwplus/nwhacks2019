import React from 'react';
import PropTypes from 'prop-types';

const InputContext = React.createContext({});

const RadioButton = ({ name, value, label, selected, disabled, onChange }) => (
  <InputContext.Consumer>
    {context => (
      <label className="radio-button">
        <input
          type="radio"
          name={name || context.name}
          value={value}
          defaultChecked={selected || context.selected}
          disabled={disabled || context.disabled}
          onChange={onChange || context.onChange}
        />
        <span className="radio-img" />
        <span className="label-text">{label}</span>
      </label>
    )}
  </InputContext.Consumer>
);

RadioButton.propTypes = {
  // name should be the same amongst radio buttons in a radio group
  name: PropTypes.string,

  // input value for the radio button
  value: PropTypes.string.isRequired,

  // label text for the radio button
  label: PropTypes.string.isRequired,

  // onChange functional
  onChange: PropTypes.func,

  // determines if the radio button is selected
  selected: PropTypes.bool,

  // determines if the radio button is disabled
  disabled: PropTypes.bool,
};

const RadioGroup = (props) => {
  const { children } = props;
  return (
    <InputContext.Provider value={props}>
      <div>{children}</div>
    </InputContext.Provider>
  );
};

RadioGroup.propTypes = {
  // can contain one or many RadioButton components
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.array,
  ]),
};

export {
  RadioButton,
  RadioGroup,
};
