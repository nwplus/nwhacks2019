import React from 'react';
import PropTypes from 'prop-types';
import Creatable from 'react-select/lib/Creatable';
import { components } from 'react-select';
import arrow from '../../../assets/select/arrow.svg';

// drop-down arrow component
const DropdownIndicator = (props) => {
  const { selectProps } = props;
  return components.DropdownIndicator && (
    <components.DropdownIndicator {...props}>
      <img src={arrow} alt="↓" className={selectProps.menuIsOpen ? 'flip-vertical' : ''} />
    </components.DropdownIndicator>
  );
};


// a custom wrapper class around react-select (https://react-select.com)
export class Select extends React.Component {
  isMaxCharNumberExceeded = (value) => {
    const { newOptionMaxCharNumber } = this.props;
    return value.length > newOptionMaxCharNumber;
  }

  isMinCharNumber = (value) => {
    const { newOptionMinCharNumber } = this.props;
    return value.length >= newOptionMinCharNumber;
  }

  isValidNewOption = (inputValue, selectValue, selectOptions) => {
    const { isValidNewOption, allowNewOption } = this.props;
    return allowNewOption
      && this.isMinCharNumber(inputValue)
      && !this.isMaxCharNumberExceeded(inputValue)
      && isValidNewOption(inputValue, selectValue, selectOptions);
  }

  render() {
    const {
      label,
      className,
      options,
      disabled,
      formatNewOptionLabel,
      placeholder,
      isSearchable,
      isMulti,
      onBlur,
      onChange,
      onFocus,
      onInputChange,
      onKeyDown,
      onMenuOpen,
      onMenuClose,
      onMenuScrollToTop,
      onMenuScrollToBottom,
      inputValue,
      error,
      value,
    } = this.props;

    const inputProps = {
      placeholder,
      isSearchable,
      isMulti,
      onBlur,
      onChange,
      onFocus,
      onInputChange,
      onKeyDown,
      onMenuOpen,
      onMenuClose,
      onMenuScrollToTop,
      onMenuScrollToBottom,
      inputValue,
    };

    if (value) {
      inputProps.value = { value, label: value };
    }

    return (
      <div className={`${className}`}>
        <h5 className="body-text">{label}</h5>
        <Creatable
          {...inputProps}
          options={options.map(option => ((typeof option === 'object') ? option : { value: option, label: option }))}
          className={`react-select-container ${error ? 'react-select-error' : ''}`}
          classNamePrefix="react-select"
          components={{ DropdownIndicator }}
          formatCreateLabel={formatNewOptionLabel}
          isValidNewOption={this.isValidNewOption}
          isDisabled={disabled}
          noOptionsMessage={() => 'Start typing to search'}
        />
        <div>{error ? (<p className="error-message">{error.message}</p>) : null}</div>
      </div>
    );
  }
}

Select.defaultProps = {
  newOptionMaxCharNumber: 255,
  newOptionMinCharNumber: 1,
  isValidNewOption: () => true,
  formatNewOptionLabel: label => `Use "${label}"`,
  placeholder: 'Select an option',
  isSearchable: false,
  allowNewOption: false,
};

Select.propTypes = {
  // label for the select input
  label: PropTypes.string.isRequired,
  // additional class names
  className: PropTypes.string,
  // input name
  name: PropTypes.string.isRequired,
  // string displayed before any option is selected
  placeholder: PropTypes.string,
  // list of values (primitives or objects) that will be selectable options
  // Note: if a value in the list is an object,
  //       you must define 'label' and 'value' fields within that object
  options: PropTypes.array.isRequired,
  // allow user to search options
  isSearchable: PropTypes.bool,
  // allow user to select multiple options
  isMulti: PropTypes.bool,
  // is input disabled
  disabled: PropTypes.bool,
  // allows user to define a new option if their answer isn't available by default
  allowNewOption: PropTypes.bool,
  // new handler that returns string shown when user is creating new option
  formatNewOptionLabel: PropTypes.func,
  // minimum number of characters for new option
  newOptionMinCharNumber: PropTypes.number,
  // maximum number of characters for new option
  newOptionMaxCharNumber: PropTypes.number,
  // additional handler used to validate new option created by user
  isValidNewOption: PropTypes.func,
  // error of format { message: "error message" }. The message will be displayed with error styling
  error: PropTypes.object,
  // see handlers here: https://react-select.com/props#select-props
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
  isLoading: PropTypes.bool,
  inputValue: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onInputChange: PropTypes.func,
  onKeyDown: PropTypes.func,
  onMenuOpen: PropTypes.func,
  onMenuClose: PropTypes.func,
  onMenuScrollToTop: PropTypes.func,
  onMenuScrollToBottom: PropTypes.func,
};
