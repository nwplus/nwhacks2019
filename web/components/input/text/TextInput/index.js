import React from 'react';
import PropTypes from 'prop-types';

const TextInput = ({
  label,
  onChange,
  onBlur,
  password,
  error,
  placeholder,
  value,
  disabled,
  id,
}) => {
  const inputProps = {
    id,
    placeholder,
    onChange,
    onBlur,
    value,
    disabled,
  };

  if (password) inputProps.type = 'password';

  return (
    <div className="text-input">
      <label
        htmlFor={id}
        >
        {label}
        <br />
        <input
          {...inputProps}
          className={error ? 'error' : ''}
          />
        { error ? (<p>{error.message}</p>) : (<div />) }
      </label>
    </div>
  );
};

TextInput.propTypes = {
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  password: PropTypes.bool,
  error: PropTypes.object,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  disabled: PropTypes.bool,
  id: PropTypes.string.isRequired,
};

export default TextInput;
