import React from 'react';
import PropTypes from 'prop-types';

import { Application } from '../../components/application';
import { ApplicationContext } from './Context';

export class ApplicationContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cancelled: false,
      isNextButtonEnabled: false,
    };
  }

  onPageChange = (activeIndex) => {
    const { changePage, changeLastActiveIndex, lastValidIndex } = this.props;
    changePage(activeIndex);
    this.setState({ isNextButtonEnabled: false });
    if (activeIndex > lastValidIndex) {
      changeLastActiveIndex(activeIndex);
    }
  }

  onPageNext = () => {
    const { activeIndex } = this.props;
    const nextIndex = activeIndex + 1;
    this.onPageChange(nextIndex);
  }

  onPageBack = () => {
    const { activeIndex } = this.props;
    const nextIndex = activeIndex - 1;
    this.onPageChange(nextIndex);
  }

  onApplicationChange = (app) => {
    const { updateApplication } = this.props;
    updateApplication(app);
  }

  alertThenCancel = () => {
    if (window.confirm('Are you sure you want to cancel?')) {
      this.cancel();
    }
  };

  cancel = () => {
    const { cancelApplication } = this.props;
    this.setState({ cancelled: true });
    cancelApplication();
  }

  updateNextButtonState = (enabled) => {
    if (enabled) {
      this.enableNextButton();
    } else {
      this.disableNextButton();
    }
  }

  enableNextButton = () => {
    const { isNextButtonEnabled } = this.state;

    if (!isNextButtonEnabled) {
      this.setState({ isNextButtonEnabled: true });
    }
  }

  disableNextButton = () => {
    const { isNextButtonEnabled } = this.state;

    if (isNextButtonEnabled) {
      this.setState({ isNextButtonEnabled: false });
    }
  }

  // submitApplication = (userCredentials) => {
  //   const { firebase } = this.props;
  //   // TODO: hide this under feature flag https://github.com/nwplus/nwhacks2019/issues/114
  //   // this.signUp(firebase, userCredentials);
  // }
  submitApplication = () => {
    // const { firebase } = this.props;
    // TODO: hide this under feature flag https://github.com/nwplus/nwhacks2019/issues/114
    // this.signUp(firebase, userCredentials);
  }

  // signUp(firebase, userCredentials) {
  //   const auth = firebase.auth();
  //   const { email, password } = userCredentials;
  //   auth.createUserWithEmailAndPassword(email, password).then(() => {
  //     console.log('user successfully created!');
  //   }).catch((error) => {
  //     console.err('failed to create user: ', error);
  //   });
  // }

  render() {
    const {
      application,
      activeIndex,
      lastValidIndex,
    } = this.props;
    const { cancelled, isNextButtonEnabled } = this.state;

    const { children } = this.props;

    const applicationProps = {
      count: children.length,
      activeIndex,
      lastValidIndex,
      onPageChange: this.onPageChange,
      onPageBack: this.onPageBack,
      onPageNext: this.onPageNext,
      onApplicationChange: this.onApplicationChange,
      cancelApplication: this.alertThenCancel,
      cancelled,
      isNextButtonEnabled,
      updateNextButtonState: this.updateNextButtonState,
      submitApplication: this.submitApplication,
      application,
    };

    return (
      <ApplicationContext.Provider value={applicationProps}>
        <Application pages={children} />
      </ApplicationContext.Provider>
    );
  }
}

ApplicationContainer.propTypes = {
  application: PropTypes.object,
  changePage: PropTypes.func.isRequired,
  changeLastActiveIndex: PropTypes.func.isRequired,
  activeIndex: PropTypes.number.isRequired,
  lastValidIndex: PropTypes.number.isRequired,
  updateApplication: PropTypes.func.isRequired,
  cancelApplication: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.array,
  ]),
};

export default ApplicationContainer;
