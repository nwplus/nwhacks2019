import React from 'react';
import PropTypes from 'prop-types';
import Reaptcha from 'reaptcha';
import { recaptchaConfig } from '../../../../main.config';

import { ProgressGroup, SecondaryButton, PrimaryButton, ButtonGroup } from '../../../input/buttons';
import { getPrimaryButtonText } from './utils';


export class HackerApplicationPageTemplate extends React.Component {
  constructor(props) {
    super(props);
    this.captcha = null;
    this.state = {
      submitFailed: false,
      isSubmitting: false,
    };
    this.onSubmitFail = this.onSubmitFail.bind(this);
  }

  onSubmitButtonClick() {
    const { submitFailed } = this.state;
    const { submitApplication } = this.props;
    if (submitFailed) { // if user has previously failed a submit
      this.setState({ isSubmitting: true, submitFailed: false });
      const { token } = this.state; // still-valid token from the last time user clicked submit
      submitApplication(null, token, this.onSubmitFail);
    } else {
      this.setState({ submitFailed: false });
      this.captcha.execute();
    }
  }

  onSubmitFail() {
    this.setState({ isSubmitting: false, submitFailed: true });
  }

  render() {
    const {
      count,
      activeIndex,
      lastValidIndex,
      onPageChange,
      onPageBack,
      onPageNext,
      cancelApplication,
      submitApplication,
      isNextButtonEnabled,
      children,
    } = this.props;

    const { isSubmitting, submitFailed } = this.state;

    return (
      <div className="pad-nav application fill-width flex jc-center">
        <div className="pad-top-mega pad-bottom-tera">
          <ProgressGroup
            count={count}
            activeIndex={activeIndex}
            lastValidIndex={lastValidIndex}
            onClick={onPageChange}
            className="pad-bottom-mega"
          />
          <div className="hacker-application-page">
            {children}
          </div>
          <ButtonGroup className="pad-top-mega">
            <SecondaryButton
              text={activeIndex === 0 ? 'Cancel' : 'Back'}
              onClick={activeIndex === 0 ? cancelApplication : onPageBack}
            />
            <PrimaryButton
              disabled={!isNextButtonEnabled || isSubmitting}
              text={isSubmitting ? 'Submitting...' : getPrimaryButtonText(activeIndex, count)}
              onClick={activeIndex !== count - 1 ? onPageNext : () => this.onSubmitButtonClick()}
            />
            {submitFailed ? (<p>Failed to submit application, please try again!</p>) : null}
            <Reaptcha
              ref={e => (this.captcha = e)}
              sitekey={recaptchaConfig[process.env.NODE_ENV].sitekey}
              onVerify={(token) => {
                this.setState({ isSubmitting: true });
                this.setState({ token });
                submitApplication(null, token, this.onSubmitFail);
              }}
              size="invisible"
            />
          </ButtonGroup>
        </div>
      </div>
    );
  }
}

HackerApplicationPageTemplate.propTypes = {
  count: PropTypes.number,
  activeIndex: PropTypes.number,
  lastValidIndex: PropTypes.number,
  onPageChange: PropTypes.func,
  onPageBack: PropTypes.func,
  onPageNext: PropTypes.func,
  cancelApplication: PropTypes.func,
  submitApplication: PropTypes.func,
  isNextButtonEnabled: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.array,
  ]),
};
