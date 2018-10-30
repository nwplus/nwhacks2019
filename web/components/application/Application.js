import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

class Application extends React.Component {
  componentWillMount() {
    const {
      pages,
      resetApplicationUI,
      activeIndex,
    } = this.props;

    if (activeIndex >= pages.length) {
      resetApplicationUI();
    }
  }

  render() {
    const {
      pages,
      cancelled,
      activeIndex,
    } = this.props;

    // TODO: under feature flag
    // if (application.isSubmitted) return (<Redirect to="/dashboard" />);
    if (cancelled) return (<Redirect to="/" />);

    return React.cloneElement(pages[activeIndex], this.props);
  }
}

Application.propTypes = {
  pages: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.array,
  ]),
  resetApplicationUI: PropTypes.func,
  activeIndex: PropTypes.number,
  cancelled: PropTypes.bool,
};

export default Application;
