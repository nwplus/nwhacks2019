import React from 'react';

import { TextInput } from '../../../input/text';
import { HackerApplicationPageTemplate } from './PageTemplate';
import { Page } from '../../Page';

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
    const {
      application: {
        firstName,
      },
    } = this.props;

    return (
      <HackerApplicationPageTemplate {...this.getPageTemplateProps()}>
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
          onChange={(newFirstName) => {
            this.updateApplication({
              firstName: newFirstName,
            });
          }}
          />
      </HackerApplicationPageTemplate>
    );
  }
}

export default PageOne;
