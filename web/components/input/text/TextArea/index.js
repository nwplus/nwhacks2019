import React from 'react';
import PropTypes from 'prop-types';

class TextArea extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      currentCharCount: 0,
      currentWordCount: 0,
      maxWordCount: this.props.maxWordCount,
    };
  }

  // handleClick = () => {
  //   const { showDropDown } = this.state;
  //   this.setState({ showDropDown: !showDropDown });
  // };
  
  onTextChange = (text) => {
    const charCount = text.length;
    let wordCount = 0;
    if (text.trim().length != 0){
      wordCount = text.trim().replace(`/\s+gi\b`, ' ').split(' ').length;
    }
    this.setState({
      currentCharCount: charCount, 
      currentWordCount: wordCount,
    });
  };

  render() {
    const { label, placeholder, value, rows, cols, name, className } = this.props;
    const { currentCharCount, currentWordCount, maxWordCount } = this.state;
    const numWordsAvailable = maxWordCount - currentWordCount;
    const wordCountExceeded = (currentWordCount - 1) >= maxWordCount;
    return (
      <div className={`text-area ${className}`}>
        <h5>{label}</h5>
        <label>
          <textarea
            placeholder={placeholder}
            onChange={e => this.onTextChange(e.target.value)}
            value={value}
            name={name}
            rows={rows}
            cols={cols}
            className={`pad-sides-s pad-ends-s flex jc-between ${wordCountExceeded ? 'error' : ''}`}
            maxLength={wordCountExceeded ? (currentCharCount) : undefined}
          >{value}</textarea>
        </label>
          {(wordCountExceeded) ? 
            (<p className="error"> Sorry! It looks like your answer is more than {maxWordCount} words. </p>) : 
            (<p>You have {numWordsAvailable} words left.</p>)}
      </div>
    );
  }
}

TextArea.defaultProps = {
  showWordCount: true,
  className: '',
};

TextArea.propTypes = {
  // the label text for the textarea header
  label: PropTypes.string.isRequired,

  // placeholder text for the textarea
  placeholder: PropTypes.string,

  // maximum word count for textarea
  maxWordCount: PropTypes.number.isRequired,

  // initial textarea value
  value: PropTypes.string,

  // number of rows for textarea (determines height)
  rows: PropTypes.number,

  // number of columns for textarea (determines width)
  cols: PropTypes.number,

  // input name on form
  name: PropTypes.string.isRequired,

  // show the word count as the user is typing
  showWordCount: PropTypes.bool,

  // optional extra className
  className: PropTypes.string,
};

export { TextArea };
