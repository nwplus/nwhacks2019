import React from 'react';
import PropTypes from 'prop-types';

import { ProgressGroup, SecondaryButton, PrimaryButton, ButtonGroup } from '../../../input/buttons';
import { getPrimaryButtonText } from './utils';

export const HackerApplicationPageTemplate = ({
  count,
  activeIndex,
  lastValidIndex,
  onPageChange,
  onPageBack,
  onPageNext,
  cancelApplication,
  isNextButtonEnabled,
  children,
}) => (
  <div className="pad-nav application fill-width flex jc-center">
    <div className="pad-ends-mega">
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
          onClick={activeIndex !== count - 1 ? onPageNext : () => console.log('submit application')}
          />
      </ButtonGroup>
    </div>
  </div>
);

HackerApplicationPageTemplate.propTypes = {
  count: PropTypes.number,
  activeIndex: PropTypes.number,
  lastValidIndex: PropTypes.number,
  onPageChange: PropTypes.func,
  onPageBack: PropTypes.func,
  onPageNext: PropTypes.func,
  cancelApplication: PropTypes.func,
  isNextButtonEnabled: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.array,
  ]),
};
