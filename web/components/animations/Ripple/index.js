import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class Ripple extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      rippleStyle: {
        opacity: 0,
        transform: 'translate(-50%, -50%)',
      },
    };
  }

  handleClick = (event) => {
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

    // Set ripple to fade away fater timeout
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
  }

  render() {
    const { children, disabled, ...props } = this.props;
    const { rippleStyle } = this.state;

    const handler = disabled ? () => {} : this.handleClick;

    const pop = <div className="pop" style={rippleStyle} />;

    return (
      <span
        {...props}
        onClick={handler}
        onKeyDown={handler}
        className="ripple">

        {pop}
        {children}
      </span>
    );
  }
}

Ripple.propTypes = {
  children: PropTypes.any,
  disabled: PropTypes.bool,
};

export default Ripple;
