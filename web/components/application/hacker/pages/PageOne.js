import React from 'react';
import update from 'immutability-helper';
import PropTypes from 'prop-types';

import propTypesTemplates from '../../../../prop-types-templates';
import { TextInput } from '../../../input/text';

const PageOne = (props) => {
  const { hackerApplication, onHackerApplicationChange } = props;
  const { firstName } = hackerApplication;
  const formName = 'hacker-application';

  return (
    <form className="hacker-application-page" id="hacker-application-page-1" name={formName}>
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
        label="First Name"
        name={formName}
        value={firstName}
        onChange={(fname) => {
          const updatedHackerApplication = update(hackerApplication, {
            $merge: {
              firstName: fname,
            },
          });
          onHackerApplicationChange(updatedHackerApplication);
        }}
        />
    </form>
  );
};

PageOne.propTypes = {
  hackerApplication: propTypesTemplates.application.hacker,
  onHackerApplicationChange: PropTypes.func.isRequired,
};

export default PageOne;
