import React from 'react';
import update from 'immutability-helper';
import PropTypes from 'prop-types';

import propTypesTemplates from '../../../../prop-types-templates';
import { TextInput } from '../../../input/text';

// TODO: Update design for page two
// For now, just copy pasted design from page one,
// since we're only concerned about functionality at the moment
class PageTwo extends React.Component {
  componentWillMount() {
    const { hackerApplication: { email } } = this.props;

    this.updateNextButtonState(email);
  }

  updateNextButtonState = (email) => {
    const { updateNextButtonState } = this.props;

    const enabled = email.length > 0;
    updateNextButtonState(enabled);
  }

  render() {
    const { hackerApplication, onHackerApplicationChange } = this.props;
    const { email } = hackerApplication;

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
          label="Email"
          id="hacker-application-email"
          value={email}
          onChange={(emailInput) => {
            const updatedHackerApplication = update(hackerApplication, {
              $merge: {
                email: emailInput,
              },
            });
            onHackerApplicationChange(updatedHackerApplication);
            this.updateNextButtonState(emailInput);
          }}
          />
      </div>
    );
  }
}

PageTwo.propTypes = {
  hackerApplication: propTypesTemplates.application.hacker,
  onHackerApplicationChange: PropTypes.func.isRequired,
  updateNextButtonState: PropTypes.func.isRequired,
};

export default PageTwo;
