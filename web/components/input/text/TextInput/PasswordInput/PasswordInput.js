import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const PasswordInput = ({
  label,
  onChange,
  error,
  placeholder,
  value,
  showErrorMessage,
  id,
}) => {
  const inputProps = {
    id,
    placeholder,
    onChange,
    value,
  };

  return (
    <div className="text-input password-input">
      <div>
        <h5>{label}</h5>
        <Link to="/">Forgot?</Link>
      </div>
      <label
        htmlFor={id}
        >
        <input
          {...inputProps}
          type="password"
          className={error ? 'error' : ''}
          />
        { (error && showErrorMessage) ? (<p>{error.message}</p>) : (<div />) }
      </label>
    </div>
  );
};

PasswordInput.propTypes = {
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  error: PropTypes.object,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  id: PropTypes.string.isRequired,
  showErrorMessage: PropTypes.bool,
};

export default PasswordInput;
