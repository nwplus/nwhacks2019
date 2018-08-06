import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import { ProgressGroup, SecondaryButton, PrimaryButton } from '../../input/buttons';

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
        <h1>About you</h1>
        <p>nwHacks is Western Canada’s largest collegiate hackathon taking place on January 26th - 27th, 2019 at the University of British Columbia. As expected, we receive a large number of applications every year. We focus on curating a quality hackathon experience for each attendee. For a fair assessment of your application, we encourage you to put your best foot forward on this journey!⛰️</p>
        <SecondaryButton
          text="Back"
          onClick={onPageBack}
          disabled={activeIndex === 0}
          />
        <PrimaryButton
          text="Next"
          onClick={onPageNext}
          />
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
