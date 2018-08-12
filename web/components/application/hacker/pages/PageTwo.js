import React from 'react';
import update from 'immutability-helper';
import PropTypes from 'prop-types';

import propTypes from '../../../../prop-types';
import { TextInput } from '../../../input/text';

// TODO: Update design for page two
// For now, just copy pasted design from page one, since we're only concerned about functionality at the moment
const PageTwo = (props) => {
  const { hackerApplication, onHackerApplicationChange } = props;
  const { lastName } = hackerApplication;

  return (
    <div className="hacker-application-page" id="hacker-application-page-2">
      <h1>About you <span role="img" aria-label="book">📚</span></h1>
      <p>
      nwHacks is Western Canada’s largest collegiate hackathon taking place
       on January 26th - 27th, 2019 at the University of British Columbia.
      As expected, we receive a large number of applications every year.
      We focus on curating a quality hackathon experience for each attendee.
      For a fair assessment of your application,
      we encourage you to put your best foot forward on this journey!<span role="img" aria-label="mountain">⛰️</span>
      </p>
      <TextInput
        label="Last Name"
        id="last-name"
        value={lastName}
        onChange={(lname) => {
          const updatedHackerApplication = update(hackerApplication, {
            $merge: {
              lastName: lname,
            },
          });
          onHackerApplicationChange(updatedHackerApplication);
        }}
        />
    </div>
  );
};

PageTwo.propTypes = {
  hackerApplication: propTypes.application.hacker,
  onHackerApplicationChange: PropTypes.func.isRequired,
};

export default PageTwo;
