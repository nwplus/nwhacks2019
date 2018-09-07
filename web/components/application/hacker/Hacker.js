import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import PageOne from './pages/PageOne';
import PageTwo from './pages/PageTwo';
import SignUp from './pages/SignUp';

import propTypesTemplates from '../../../prop-types-templates';

const HackerApplication = (props) => {
  const { hackerApplication, cancelled } = props;
  if (hackerApplication.isSubmitted) return (<Redirect to="/dashboard" />);
  if (cancelled) return (<Redirect to="/" />);

  const {
    count,
    activeIndex,
    lastValidIndex,
    onPageChange,
    onPageBack,
    onPageNext,
    onHackerApplicationChange,
    cancelHackerApplication,
    isNextButtonEnabled,
    updateNextButtonState,
    submitApplication,
  } = props;

  const indexToPage = {
    0: (
      <PageOne
        hackerApplication={hackerApplication}
        onHackerApplicationChange={onHackerApplicationChange}
        updateNextButtonState={updateNextButtonState}
        count={count}
        lastValidIndex={lastValidIndex}
        onPageChange={onPageChange}
        onPageBack={onPageBack}
        onPageNext={onPageNext}
        isNextButtonEnabled={isNextButtonEnabled}
        cancelHackerApplication={cancelHackerApplication}
        activeIndex={activeIndex}
        />
    ),
    1: (
      <PageTwo
        hackerApplication={hackerApplication}
        onHackerApplicationChange={onHackerApplicationChange}
        updateNextButtonState={updateNextButtonState}
        count={count}
        lastValidIndex={lastValidIndex}
        onPageChange={onPageChange}
        onPageBack={onPageBack}
        onPageNext={onPageNext}
        isNextButtonEnabled={isNextButtonEnabled}
        cancelHackerApplication={cancelHackerApplication}
        activeIndex={activeIndex}
        />
    ),
    2: (
      <SignUp
        hackerApplication={hackerApplication}
        onHackerApplicationChange={onHackerApplicationChange}
        updateNextButtonState={updateNextButtonState}
        count={count}
        lastValidIndex={lastValidIndex}
        onPageChange={onPageChange}
        onPageBack={onPageBack}
        onPageNext={onPageNext}
        isNextButtonEnabled={isNextButtonEnabled}
        cancelHackerApplication={cancelHackerApplication}
        activeIndex={activeIndex}
        submitApplication={submitApplication}
        />
    ),
  };

  return (indexToPage[activeIndex]);
};

HackerApplication.propTypes = {
  hackerApplication: propTypesTemplates.application.hacker,
  count: PropTypes.number,
  activeIndex: PropTypes.number,
  lastValidIndex: PropTypes.number,
  onPageChange: PropTypes.func,
  onPageBack: PropTypes.func,
  onPageNext: PropTypes.func,
  onHackerApplicationChange: PropTypes.func,
  cancelHackerApplication: PropTypes.func.isRequired,
  cancelled: PropTypes.bool.isRequired,
  isNextButtonEnabled: PropTypes.bool.isRequired,
  updateNextButtonState: PropTypes.func.isRequired,
  submitApplication: PropTypes.func.isRequired,
};

export default HackerApplication;
