import React from 'react';
import PropTypes from 'prop-types';

const TextInput = ({
  label,
  onChange,
  onBlur,
  error,
  placeholder,
  value,
  disabled,
  showErrorMessage,
  name,
}) => {
  const inputProps = {
    name,
    placeholder,
    onChange: e => onChange(e.target.value),
    onBlur,
    value,
    disabled,
  };

  return (
    <div className="text-input">
      <h5>{label}</h5>
      <label>
        <input
          {...inputProps}
          className={error ? 'error' : ''}
          />
        { (error && showErrorMessage) ? (<p>{error.message}</p>) : (<div />) }
      </label>
    </div>
  );
};

TextInput.propTypes = {
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  error: PropTypes.object,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  disabled: PropTypes.bool,
  name: PropTypes.string.isRequired,
  showErrorMessage: PropTypes.bool,
};

export default TextInput;
