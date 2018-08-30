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
  id,
}) => {
  const inputProps = {
    id,
    placeholder,
    onChange: e => onChange(e.target.value),
    onBlur,
    value,
    disabled,
  };

  return (
    <div className="text-input">
      <h5>{label}</h5>
      <label
        htmlFor={id}
        >
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
  label: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  error: PropTypes.object,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  disabled: PropTypes.bool,
  id: PropTypes.string.isRequired,
  showErrorMessage: PropTypes.bool,
};

export default TextInput;
