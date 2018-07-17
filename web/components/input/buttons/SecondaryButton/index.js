import React from 'react';
import PropTypes from 'prop-types';

class SecondaryButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      rippleStyle: {
        opacity: 0,
        transform: 'translate(-50%, -50%)',
      },
    };
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  onClickWrapper = (event) => {
    const {
      pageX,
      pageY,
      currentTarget: { offsetLeft, offsetTop, offsetWidth, offsetHeight },
    } = event;

    const left = pageX - offsetLeft;
    const top = pageY - offsetTop;
    const size = Math.max(offsetWidth, offsetHeight);

    // Create a visible ripple
    this.setState({
      rippleStyle: {
        top,
        left,
        opacity: 0.75,
        transform: 'translate(-50%, -50%)',
        transition: 'initial',
      },
    });

    // Set ripple to fade away after timeout
    this.timer = setTimeout(() => {
      this.setState({
        rippleStyle: {
          top,
          left,
          opacity: 0,
          transform: `scale(${size / 9})`,
          transition: `all ${800}ms`,
        },
      });
    });

    // Continue
    const { onClick } = this.props;
    if (onClick) onClick(event);
  }

  render() {
    const { rippleStyle } = this.state;
    const { disabled, text } = this.props;
    return (
      <button
        onClick={this.onClickWrapper}
        type="button"
        disabled={disabled}
        className="secondary">
        { text }
        <span className="ripple" style={rippleStyle} />
      </button>
    );
  }
}

SecondaryButton.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
};

export default SecondaryButton;
