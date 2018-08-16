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
  className,
  sideLinkText,
  sideLinkOnClick,
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
    <div className={`text-input ${className}`}>
      <h5>{label}</h5>
      <label
        htmlFor={id}
        >
        <input
          {...inputProps}
          className={error ? 'error' : ''}
          />
        { sideLinkText
          ? (
            <span className="margin-left-s">
              <a className="underline" onClick={sideLinkOnClick}>{sideLinkText}</a>
            </span>
          )
          : null }
        { (error && showErrorMessage) ? (<p>{error.message}</p>) : (<div />) }
      </label>
    </div>
  );
};

TextInput.defaultProps = {
  className: '',
  sideLinkOnClick: () => {},
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
  className: PropTypes.string,
  sideLinkText: PropTypes.string,
  sideLinkOnClick: PropTypes.func,
};

export default TextInput;
