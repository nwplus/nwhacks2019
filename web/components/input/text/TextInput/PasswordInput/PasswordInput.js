import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const PasswordInput = ({
  label,
  onChange,
  onBlur,
  error,
  placeholder,
  value,
  showErrorMessage,
  id,
  showForgot,
  showError,
  className,
}) => {
  const inputProps = {
    id,
    onBlur,
    placeholder,
    onChange: e => onChange(e.target.value),
    value,
  };

  return (
    <div className={`text-input password-input ${className}`}>
      <div>
        <h5>{label}</h5>
        { showForgot ? <Link to="/">Forgot?</Link> : null }
      </div>
      <label
        htmlFor={id}
        >
        <input
          {...inputProps}
          type="password"
          className={(error && showError) ? 'error' : ''}
          />
        { (error && showErrorMessage) ? (<p>{error.message}</p>) : (<div />) }
      </label>
    </div>
  );
};

PasswordInput.defaultProps = {
  showError: true,
  showErrorMessage: true,
  className: '',
};

PasswordInput.propTypes = {
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  error: PropTypes.object,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  id: PropTypes.string.isRequired,
  showError: PropTypes.bool,
  showErrorMessage: PropTypes.bool,
  showForgot: PropTypes.bool,
  className: PropTypes.string,
};

export default PasswordInput;
