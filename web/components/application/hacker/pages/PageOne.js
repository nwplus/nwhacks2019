import React from 'react';

import propTypes from '../../../../prop-types';
import { TextInput } from '../../../input/text';

const PageOne = (props) => {
  const { hackerApplication, onHackerApplicationChange } = props;
  const { firstName } = hackerApplication;

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
      <TextInput
        label="First Name"
        id="first-name"
        value={firstName}
        onChange={(fname) => {
          hackerApplication.firstName = fname;
          onHackerApplicationChange(hackerApplication);
        }}
        />
    </div>
  );
};

PageOne.propTypes = {
  hackerApplication: propTypes.application.hacker,
};

export default PageOne;
