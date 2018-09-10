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
  name,
  showForgot,
  showError,
  className,
  maxCharNumber,
}) => {
  const inputProps = {
    name,
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
      <label>
        <input
          {...inputProps}
          maxLength={maxCharNumber}
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
  maxCharNumber: 256,
};

PasswordInput.propTypes = {
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  error: PropTypes.object,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  name: PropTypes.string.isRequired,
  showError: PropTypes.bool,
  showErrorMessage: PropTypes.bool,
  showForgot: PropTypes.bool,
  className: PropTypes.string,
  maxCharNumber: PropTypes.number,
};

export default PasswordInput;
