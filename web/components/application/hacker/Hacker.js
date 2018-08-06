import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import { ProgressGroup } from '../../input/buttons';
import { SecondaryButton } from '../../input/buttons';
import { PrimaryButton } from '../../input/buttons';

const HackerApplication = (props) => {
  const { hackerApplication } = props;
  if (!hackerApplication.isLoaded) return (<div />);
  if (hackerApplication.data) return (<Redirect to="/dashboard" />);

  const { count, activeIndex, lastValidIndex, onPageChange, onPageBack, onPageNext } = props;
  return (
    <div className="below-nav">
      <p>o hello there pls apply</p>
      <ProgressGroup
        count={count}
        activeIndex={activeIndex}
        lastValidIndex={lastValidIndex}
        onClick={onPageChange}
        />
      <SecondaryButton
        text="Back"
        onClick={onPageBack}
        disabled={activeIndex == 0}
        />
      <PrimaryButton
        text="Next"
        onClick={onPageNext}
        />
    </div>
  );
};

HackerApplication.propTypes = {
  hackerApplication: PropTypes.object.isRequired,
};

export default HackerApplication;
