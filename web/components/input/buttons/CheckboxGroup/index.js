import React from 'react';
import PropTypes from 'prop-types';

const InputContext = React.createContext({});

const Checkbox = ({ name, value, label, className, checked, disabled, onChange }) => (
  <InputContext.Consumer>

    {
      (context) => {
        const contextOnChange = event => context.onChange(event.target.value);
        return (
          <div className={`checkbox user-select-none margin-bottom-s margin-left-s ${className}`}>
            <label className="clickable">
              <input
                type="checkbox"
                name={name || context.name}
                className="pos-abs opacity-0"
                value={value}
                defaultChecked={checked || context.checked}
                disabled={disabled || context.disabled}
                onChange={onChange || contextOnChange}
              />
              <span className="checkmark size-icon pos-abs" />
              <span className="label-text margin-left-l white-space-nowrap">{label}</span>
            </label>
          </div>
        );
      }
    }
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

Checkbox.defaultProps = {
  className: '',
};

const CheckboxGroup = (props) => {
  const { children, className, label } = props;
  return (
    <InputContext.Provider value={props}>
      <div className={className}>
        {label ? <h5>{label}</h5> : null}
        <div className={`flex wrap ${className}`}>{children}</div>
      </div>
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
      defaultChecked,
      disabled,
      onChange,

  */
};

CheckboxGroup.defaultProps = {
  className: '',
};

export {
  Checkbox,
  CheckboxGroup,
};
