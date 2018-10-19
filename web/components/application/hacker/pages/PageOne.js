import React from 'react';
import update from 'immutability-helper';

import { TextInput } from '../../../input/text';
import { HackerApplicationPageTemplate } from './PageTemplate';
import { ApplicationContext } from '../../../../containers/application/Context';
import { Page } from './Page';

class PageOne extends Page {
  shouldNextButtonBeEnabled = () => {
    const {
      application: {
        firstName,
      },
    } = this.props;
    return firstName.length > 0;
  }

  render() {
    return (
      <ApplicationContext.Consumer>
        {
          (applicationProps) => {
            const {
              application,
              onApplicationChange,
            } = applicationProps;

            const { firstName } = application;

            const { isNextButtonEnabled } = this.state;

            return (
              <HackerApplicationPageTemplate isNextButtonEnabled={isNextButtonEnabled}>
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
              </HackerApplicationPageTemplate>
            );
          }
        }
      </ApplicationContext.Consumer>
    );
  }
}

export default PageOne;
