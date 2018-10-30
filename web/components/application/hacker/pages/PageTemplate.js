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
              disabled={!isNextButtonEnabled}
              text={getPrimaryButtonText(activeIndex, count)}
              onClick={activeIndex !== count - 1 ? onPageNext : () => this.captcha.execute()}
            />
            <Reaptcha
              ref={e => (this.captcha = e)}
              sitekey={recaptchaConfig[process.env.NODE_ENV].sitekey}
              onVerify={(token) => {
                submitApplication(null, token);
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
