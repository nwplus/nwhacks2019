import React from 'react';
import update from 'immutability-helper';
import PropTypes from 'prop-types';

import propTypesTemplates from '../../../../prop-types-templates';
import { ProgressGroup, SecondaryButton, PrimaryButton, ButtonGroup } from '../../../input/buttons';
import { TextInput } from '../../../input/text';
import { getPrimaryButtonText } from './utils';

class PageOne extends React.Component {
  componentWillMount() {
    const { application: { firstName } } = this.props;

    this.updateNextButtonState(firstName);
  }

  updateNextButtonState = (firstName) => {
    const { updateNextButtonState } = this.props;

    const enabled = firstName.length > 0;
    updateNextButtonState(enabled);
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
      isNextButtonEnabled,
      cancelApplication,
    } = this.props;
    const { firstName } = application;

    return (
      <div className="pad-nav application fill-width flex jc-center">
        <div className="pad-ends-mega">
          <ProgressGroup
            count={count}
            activeIndex={activeIndex}
            lastValidIndex={lastValidIndex}
            onClick={onPageChange}
            className="pad-bottom-mega"
            />
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
                const updatedHackerApplication = update(application, {
                  $merge: {
                    firstName: fname,
                  },
                });
                onApplicationChange(updatedHackerApplication);
                this.updateNextButtonState(fname);
              }}
              />
          </div>
          <ButtonGroup className="pad-top-mega">
            <SecondaryButton
              text={activeIndex === 0 ? 'Cancel' : 'Back'}
              onClick={activeIndex === 0 ? cancelApplication : onPageBack}
              />
            <PrimaryButton
              disabled={!isNextButtonEnabled}
              text={getPrimaryButtonText(activeIndex, count)}
              onClick={activeIndex !== count - 1 ? onPageNext : () => console.log('submit application')}
              />
          </ButtonGroup>
        </div>
      </div>
    );
  }
}

PageOne.propTypes = {
  application: propTypesTemplates.application.hacker,
  onApplicationChange: PropTypes.func.isRequired,
  updateNextButtonState: PropTypes.func.isRequired,
  count: PropTypes.number,
  activeIndex: PropTypes.number,
  lastValidIndex: PropTypes.number,
  onPageChange: PropTypes.func,
  onPageBack: PropTypes.func,
  onPageNext: PropTypes.func,
  isNextButtonEnabled: PropTypes.bool.isRequired,
  cancelApplication: PropTypes.func.isRequired,
};

export default PageOne;
