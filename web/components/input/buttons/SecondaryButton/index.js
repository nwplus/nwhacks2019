import React from 'react';
import PropTypes from 'prop-types';

class SecondaryButton extends React.Component {
  onClickWrapper = (e) => {
    const { onClick } = this.props;
    const { node, ripple } = this;

    console.log(node);
    console.log(ripple);

    node.classList.remove('btn-animate');

    ripple.style.height = '0px';
    ripple.style.width = '0px';

    const d = Math.max(node.offsetWidth, node.offsetHeight);
    ripple.style.height = d + 'px';
    ripple.style.width = d + 'px';

    const x = e.pageX - node.offsetLeft - d / 2;
    const y = e.pageY - node.offsetTop - d / 2;
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';

    node.classList.add('btn-animate');

    // Continue
    if (onClick) onClick(e);
  }

  render() {
    const { disabled, text } = this.props;
    return (
      <button
        ref={node => this.node = node}
        onClick={this.onClickWrapper}
        type="button"
        disabled={disabled}
        className="secondary">
        { text }
        <span ref={ripple => this.ripple = ripple} className="ripple" />
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
