import React from 'react';
import PropTypes from 'prop-types';

const InputContext = React.createContext({});

const Checkbox = ({
  name,
  value,
  label,
  className,
  checked,
  disabled,
  onChange,
  isControlled,
  isIndeterminate,
}) => (
  <InputContext.Consumer>
    {
      (context) => {
        const contextOnChange = event => context.onChange(event.target.value);
        const checkedFieldName = isControlled || context.isControlled ? 'checked' : 'defaultChecked';
        return (
          <div className={`checkbox user-select-none margin-bottom-s margin-top-s ${className}`}>
            <label className="clickable flex">
              <input
                type="checkbox"
                name={name || context.name}
                className="pos-abs opacity-0 wrap"
                value={value}
                disabled={disabled || context.disabled}
                onChange={onChange || contextOnChange}
                {... { [checkedFieldName]: checked }}
              />
              <span className={`checkmark size-icon pos-abs ${isIndeterminate ? 'indeterminate' : ''}`} />
              <span className="label-text margin-left-l margin-right-l">{label}</span>
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
  label: PropTypes.oneOfType([PropTypes.string.isRequired, PropTypes.element.isRequired]),
  // extra CSS classes to apply to the checkbox
  className: PropTypes.string,
  // determines if checkbox is selected
  checked: PropTypes.bool,
  // determines if checkbox is disabled
  disabled: PropTypes.bool,
  // onChange function
  onChange: PropTypes.func,
  // whether or not the checkbox is a controlled component (checked vs. defaultChecked)
  isControlled: PropTypes.bool,
  // represents a third "uncertain" checked state, used when a checked value is only partially true
  isIndeterminate: PropTypes.bool,
};

Checkbox.defaultProps = {
  className: '',
  isControlled: false,
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
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
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
