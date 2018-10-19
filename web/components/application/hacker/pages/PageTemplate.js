import React from 'react';
import PropTypes from 'prop-types';

import { ProgressGroup, SecondaryButton, PrimaryButton, ButtonGroup } from '../../../input/buttons';
import { getPrimaryButtonText } from './utils';

export const PageTemplate = (props) => {
  const {
    count,
    activeIndex,
    lastValidIndex,
    onPageChange,
    onPageBack,
    onPageNext,
    isNextButtonEnabled,
    cancelApplication,
    children,
  } = props;

  return (
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
};

PageTemplate.propTypes = {
  count: PropTypes.number,
  activeIndex: PropTypes.number,
  lastValidIndex: PropTypes.number,
  onPageChange: PropTypes.func,
  onPageBack: PropTypes.func,
  onPageNext: PropTypes.func,
  isNextButtonEnabled: PropTypes.bool,
  cancelApplication: PropTypes.func.isRequired,
}
