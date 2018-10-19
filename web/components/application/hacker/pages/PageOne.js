import React from 'react';
import update from 'immutability-helper';
import PropTypes from 'prop-types';

import propTypesTemplates from '../../../../prop-types-templates';
import { TextInput } from '../../../input/text';
import { PageTemplate } from './PageTemplate';

class PageOne extends React.Component {
  componentWillMount() {
    const { application: { firstName } } = this.props;

    this.updateNextButtonState(firstName);
  }

  updateNextButtonState = (firstName) => {
    const isNextButtonEnabled = firstName.length > 0;
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
    const { firstName } = application;

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
          label="First Name"
          name="first-name"
          value={firstName}
          onChange={(fname) => {
            const updatedHackerApplication = update(application, {
              $merge: {
                firstName: fname,
              },
            });
            onApplicationChange(updatedHackerApplication);
            this.updateNextButtonState(fname);
          }}
          />
      </PageTemplate>
    );
  }
}

PageOne.propTypes = {
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

export default PageOne;
