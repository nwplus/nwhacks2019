import React from 'react';
import update from 'immutability-helper';
import PropTypes from 'prop-types';

import propTypesTemplates from '../../../../prop-types-templates';
import { TextInput } from '../../../input/text';
import { PageTemplate } from './PageTemplate';

// TODO: Update design for page two
// For now, just copy pasted design from page one,
// since we're only concerned about functionality at the moment
class PageTwo extends React.Component {
  componentWillMount() {
    const { application: { email } } = this.props;

    this.updateNextButtonState(email);
  }

  updateNextButtonState = (email) => {
    const isNextButtonEnabled = email.length > 0;
    this.setState({ isNextButtonEnabled });
  }

  render() {
    const {
      application,
      onApplicationChange,
      count,
      activeIndex,
      lastValidIndex,
      onPageChange,
      onPageBack,
      onPageNext,
      cancelApplication,
    } = this.props;

    const { isNextButtonEnabled } = this.state;
    const { email } = application;

    const templateProps = {
      count,
      activeIndex,
      lastValidIndex,
      onPageChange,
      onPageBack,
      onPageNext,
      isNextButtonEnabled,
      cancelApplication,
    };

    return (
      <PageTemplate {...templateProps}>
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
          name="hacker-application-email"
          value={email}
          onChange={(emailInput) => {
            const updatedHackerApplication = update(application, {
              $merge: {
                email: emailInput,
              },
            });
            onApplicationChange(updatedHackerApplication);
            this.updateNextButtonState(emailInput);
          }}
          />
      </PageTemplate>
    );
  }
}

PageTwo.propTypes = {
  application: propTypesTemplates.application.hacker,
  onApplicationChange: PropTypes.func.isRequired,
  count: PropTypes.number,
  activeIndex: PropTypes.number,
  lastValidIndex: PropTypes.number,
  onPageChange: PropTypes.func,
  onPageBack: PropTypes.func,
  onPageNext: PropTypes.func,
  cancelApplication: PropTypes.func.isRequired,
};

export default PageTwo;
