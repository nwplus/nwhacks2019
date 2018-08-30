import React from 'react';
import update from 'immutability-helper';
import PropTypes from 'prop-types';

import propTypesTemplates from '../../../../prop-types-templates';
import { TextInput } from '../../../input/text';

class PageOne extends React.Component {
  componentWillMount() {
    const { hackerApplication: { firstName } } = this.props;

    this.updateNextButtonState(firstName);
  }

  updateNextButtonState = (firstName) => {
    const { updateNextButtonState } = this.props;

    const enabled = firstName.length > 0;
    updateNextButtonState(enabled);
  }

  render() {
    const { hackerApplication, onHackerApplicationChange } = this.props;
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
        <TextInput
          label="First Name"
          name="first-name"
          value={firstName}
          onChange={(fname) => {
            const updatedHackerApplication = update(hackerApplication, {
              $merge: {
                firstName: fname,
              },
            });
            onHackerApplicationChange(updatedHackerApplication);
            this.updateNextButtonState(fname);
          }}
          />
      </div>
    );
  }
}

PageOne.propTypes = {
  hackerApplication: propTypesTemplates.application.hacker,
  onHackerApplicationChange: PropTypes.func.isRequired,
  updateNextButtonState: PropTypes.func.isRequired,
};

export default PageOne;
