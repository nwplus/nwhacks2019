import React from 'react';

import propTypes from '../../../../prop-types';

const PageOne = (props) => {
  const { hackerApplication } = props;

  return (
    <div className="hacker-application-page" id="hacker-application-page-1">
      <h1>About you <span role="img" aria-label="book">📚</span></h1>
      <p>
      nwHacks is Western Canada’s largest collegiate hackathon taking place
       on January 26th - 27th, 2019 at the University of British Columbia.
      As expected, we receive a large number of applications every year.
      We focus on curating a quality hackathon experience for each attendee.
      For a fair assessment of your application,
      we encourage you to put your best foot forward on this journey!<span role="img" aria-label="mountain">⛰️</span>
      </p>
      <div>{ hackerApplication.firstName || 'you got no name'}</div>
    </div>
  );
};

PageOne.propTypes = {
  hackerApplication: propTypes.application.hacker,
};

export default PageOne;
