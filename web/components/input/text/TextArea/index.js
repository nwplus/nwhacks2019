import React from 'react';
import PropTypes from 'prop-types';

class TextArea extends React.Component {
  constructor(props) {
    super(props);
    const { maxLength } = this.props;
    this.state = {
      currentCharCount: 0,
      maxLength,
    };
  }

  onTextChange = (text) => {
    this.setState({
      currentCharCount: text.length,
    });
  };

  render() {
    const { label, placeholder, rows, cols, name, showCharCount, className } = this.props;
    const { currentCharCount, maxLength } = this.state;
    const numCharsAvailable = maxLength - currentCharCount;
    const maxLengthExceeded = currentCharCount >= maxLength;
    return (
      <div className={`text-area ${className}`}>
        <h5 className="body-text">{label}</h5>
        <div>
          <textarea
            placeholder={placeholder}
            onChange={e => this.onTextChange(e.target.value)}
            name={name}
            rows={rows}
            cols={cols}
            className={`pad-sides-s pad-ends-s flex jc-between body-text fill-width box-sizing-bb ${maxLengthExceeded ? 'error' : ''}`}
            maxLength={maxLengthExceeded ? (currentCharCount) : undefined}
          />
        </div>
        {maxLengthExceeded
          ? (<p className="error">Sorry! It looks like your answer is more than {maxLength} characters long.</p>)
          : (<p>{showCharCount ? `You have ${numCharsAvailable} characters left.` : ''}</p>)}
      </div>
    );
  }
}

TextArea.defaultProps = {
  showCharCount: true,
  className: '',
};

TextArea.propTypes = {
  // the label text for the textarea header
  label: PropTypes.string.isRequired,

  // placeholder text for the textarea
  placeholder: PropTypes.string,

  // maximum char count for textarea
  maxLength: PropTypes.number.isRequired,

  // number of rows for textarea (determines height)
  rows: PropTypes.number,

  // number of columns for textarea (determines width)
  cols: PropTypes.number,

  // input name on form
  name: PropTypes.string.isRequired,

  // show the char count as the user is typing
  showCharCount: PropTypes.bool,

  // optional extra className
  className: PropTypes.string,
};

export { TextArea };
