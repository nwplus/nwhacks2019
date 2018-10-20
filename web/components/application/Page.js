import React from 'react';
import PropTypes from 'prop-types';
import update from 'immutability-helper';

export class Page extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isNextButtonEnabled: false,
    };
  }

  componentWillMount() {
    this.updateNextButtonStateIfNeeded();
  }

  componentDidUpdate() {
    this.updateNextButtonStateIfNeeded();
  }

  getPageTemplateProps = () => {
    const { isNextButtonEnabled } = this.state;

    return {
      ...this.props,
      isNextButtonEnabled,
    };
  }

  shouldNextButtonBeEnabled = () => {
    throw new Error('This method must be implemented by inherited class');
  }

  updateNextButtonStateIfNeeded = () => {
    const shouldNextButtonBeEnabled = this.shouldNextButtonBeEnabled();

    const { isNextButtonEnabled } = this.state;

    if (isNextButtonEnabled !== shouldNextButtonBeEnabled) {
      this.setState({ isNextButtonEnabled: shouldNextButtonBeEnabled });
    }
  }

  updateApplication = (change) => {
    const {
      onApplicationChange,
      application,
    } = this.props;

    const updatedApplication = update(application, {
      $merge: change,
    });

    onApplicationChange(updatedApplication);
  }
}

Page.propTypes = {
  application: PropTypes.object,
  onApplicationChange: PropTypes.func,
  count: PropTypes.number,
  activeIndex: PropTypes.number,
  lastValidIndex: PropTypes.number,
  onPageChange: PropTypes.func,
  onPageBack: PropTypes.func,
  onPageNext: PropTypes.func,
  cancelApplication: PropTypes.func,
};
