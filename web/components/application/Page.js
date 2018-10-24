import React from 'react';
import PropTypes from 'prop-types';
import update from 'immutability-helper';
import validate from 'validate.js';

export class Page extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isNextButtonEnabled: false,
      showErrorByField: {},
    };
  }

  componentWillMount() {
    const { application } = this.props;
    this.errorByField = this.validateApplication(application);
    this.updateNextButtonStateIfNeeded();
  }

  componentDidUpdate() {
    this.updateNextButtonStateIfNeeded();
  }

  getErrorIfBlurred(fieldName) {
    const { showErrorByField } = this.state;
    if (showErrorByField[fieldName] && this.errorByField && !!this.errorByField[fieldName]) {
      return { message: this.errorByField[fieldName][0] };
    }
    return null;
  }

  getPageTemplateProps = () => {
    const { isNextButtonEnabled } = this.state;

    return {
      ...this.props,
      isNextButtonEnabled,
    };
  }

  setFieldAsBlurred(fieldName) {
    const { showErrorByField } = this.state;
    if (!showErrorByField[fieldName]) {
      this.setState({
        showErrorByField: update(showErrorByField, {
          $merge: {
            [fieldName]: true,
          },
        }),
      });
    }
  }

  shouldNextButtonBeEnabled = () => this.errorByField === undefined

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
    this.errorByField = this.validateApplication(updatedApplication);
  }

  validateApplication = application => validate(application, this.constraints)
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
