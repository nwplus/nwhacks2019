import React from 'react';
import PropTypes from 'prop-types';
import concatClassName from '../../../utils';

const InputContext = React.createContext({});

const RadioButton = ({ name, value, label, className, selected, disabled, onChange }) => (
  <InputContext.Consumer>
    {context => (
      <div className={concatClassName("radio-button", (className || context.sharedClassName))}>
        <label>
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
      </div>
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
  // extra CSS classes to apply to the radio button
  className: PropTypes.string,
  // determines if the radio button is selected
  selected: PropTypes.bool,
  // determines if the radio button is disabled
  disabled: PropTypes.bool,
  // onChange functional
  onChange: PropTypes.func,
};

const RadioGroup = (props) => {
  const { children, className } = props;
  return (
    <InputContext.Provider value={props}>
    <div className={concatClassName("radio-group", className)}>{children}</div>
    </InputContext.Provider>
  );
};

RadioGroup.propTypes = {
  // can contain one or many RadioButton components
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.array,
  ]),
  // extra CSS class names for the container (not applied to children)
  className: PropTypes.string,
  // extra CSS class names passed down to all children (not applied to container)
  sharedClassName: PropTypes.string,
};

export {
  RadioButton,
  RadioGroup,
};
