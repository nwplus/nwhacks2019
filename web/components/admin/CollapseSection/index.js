import React from 'react';
import PropTypes from 'prop-types';
import Collapsible from 'react-collapsible';

class CollapseSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = { open: props.open, buttonClass: props.open ? 'collapse-button-open' : 'collapse-button-closed' };
    this.toggleDiv = this.toggleDiv.bind(this);
  }

    toggleDiv = () => {
      const { open } = this.state;
      if (open) {
        this.setState({ open: false, buttonClass: 'collapse-button-closed' });
      } else {
        this.setState({ open: true, buttonClass: 'collapse-button-open' });
      }
    };

    render() {
      const { open, buttonClass } = this.state;
      const { children, label } = this.props;
      return (
        <div className="collapse-container">
          <div className="collapse-title" onClick={this.toggleDiv}>{label}</div>
          <div className={buttonClass} onClick={this.toggleDiv} />
          <br />
          <Collapsible triggerClassName="trigger" trigger="" open={open}>
            {children}
          </Collapsible>
        </div>
      );
    }
}

CollapseSection.propTypes = {
  children: PropTypes.array,
  label: PropTypes.string,
  open: PropTypes.bool,
};
export default CollapseSection;
