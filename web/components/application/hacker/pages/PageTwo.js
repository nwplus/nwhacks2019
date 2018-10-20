import React from 'react';

import { TextInput } from '../../../input/text';
import { HackerApplicationPageTemplate } from './PageTemplate';
import { Page } from '../../Page';

// TODO: Update design for page two
// For now, just copy pasted design from page one,
// since we're only concerned about functionality at the moment
class PageTwo extends Page {
  shouldNextButtonBeEnabled = () => {
    const {
      application: {
        email,
      },
    } = this.props;
    return email.length > 0;
  }

  render() {
    const {
      application: {
        email,
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
          label="Email"
          name="hacker-application-email"
          value={email}
          onChange={(newEmail) => {
            this.updateApplication({
              email: newEmail,
            });
          }}
          />
      </HackerApplicationPageTemplate>
    );
  }
}

export default PageTwo;
