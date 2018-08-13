import React from 'react';
import PropTypes from 'prop-types';

const InputContext = React.createContext({});

const RadioButton = ({ name, value, label, className, selected, disabled, onChange }) => (
  <InputContext.Consumer>
    {context => (
      <div className={`radio-button user-select-none margin-bottom-s margin-left-s ${className}`}>
        <label className="clickable">
          <input
            type="radio"
            name={name || context.name}
            className="pos-abs opacity-0"
            value={value}
            defaultChecked={selected || context.selected}
            disabled={disabled || context.disabled}
            onChange={onChange || context.onChange}
          />
          <span className="radio-img size-icon pos-abs" />
          <span className="label-text margin-left-l white-space-nowrap">{label}</span>
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

RadioButton.defaultProps = {
  className: '',
};

const RadioGroup = (props) => {
  const { children, className } = props;
  return (
    <InputContext.Provider value={props}>
      <div className={`flex wrap ${className}`}>{children}</div>
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
  /* Additional optional parameters implicitly passed down to children

      // see RadioButton.propTypes
      name,
      selected,
      disabled,
      onChange,

  */
};

RadioGroup.defaultProps = {
  className: '',
};

export {
  RadioButton,
  RadioGroup,
};
