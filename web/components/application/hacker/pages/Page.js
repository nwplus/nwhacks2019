import React from 'react';
import PropTypes from 'prop-types';

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

  shouldNextButtonBeEnabled = () => {
    throw new Error('This method must be implemented by inherited class');
  }

  updateNextButtonStateIfNeeded = () => {
    const { isNextButtonEnabled } = this.state;

    const shouldNextButtonBeEnabled = this.shouldNextButtonBeEnabled();

    if (isNextButtonEnabled !== shouldNextButtonBeEnabled) {
      this.updateNextButtonState(shouldNextButtonBeEnabled);
    }
  }

  updateNextButtonState = (isNextButtonEnabled) => {
    this.setState({ isNextButtonEnabled });
  }
}

Page.propTypes = {
  application: PropTypes.object,
};
