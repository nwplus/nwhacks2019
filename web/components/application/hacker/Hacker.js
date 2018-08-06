import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import PageOne from './pages/PageOne';

import { ProgressGroup, SecondaryButton, PrimaryButton, ButtonGroup } from '../../input/buttons';

const indexToPage = {
  0: (<PageOne />),
};

const HackerApplication = (props) => {
  const { hackerApplication } = props;
  if (!hackerApplication.isLoaded) return (<div />);
  if (hackerApplication.data) return (<Redirect to="/dashboard" />);

  const { count, activeIndex, lastValidIndex, onPageChange, onPageBack, onPageNext } = props;
  return (
    <div className="below-nav" id="hacker-application">
      <div>
        <ProgressGroup
          count={count}
          activeIndex={activeIndex}
          lastValidIndex={lastValidIndex}
          onClick={onPageChange}
          />
        { indexToPage[activeIndex] }
        <ButtonGroup>
          <SecondaryButton
            text={activeIndex === 0 ? "Cancel" : "Back"}
            onClick={onPageBack}
            disabled={activeIndex === 0}
            />
          <PrimaryButton
            text={activeIndex === count-1 ? "Submit application" : activeIndex === count-2 ? "One last step" : "Next"}
            onClick={activeIndex !== count-1 ? onPageNext : () => console.log("submit application") }
            />
        </ButtonGroup>
      </div>
    </div>
  );
};

HackerApplication.propTypes = {
  hackerApplication: PropTypes.object.isRequired,
  count: PropTypes.number,
  activeIndex: PropTypes.number,
  lastValidIndex: PropTypes.number,
  onPageChange: PropTypes.func,
  onPageBack: PropTypes.func,
  onPageNext: PropTypes.func,
};

export default HackerApplication;
