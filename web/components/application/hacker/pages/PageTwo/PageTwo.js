import React from 'react';

import { TextInput } from '../../../../input/text';
import { HackerApplicationPageTemplate } from '../PageTemplate';
import { Page } from '../../../Page';
import { constraints } from './PageTwoConstraints';

// TODO: Update design for page two
// For now, just copy pasted design from page one,
// since we're only concerned about functionality at the moment
class PageTwo extends Page {
  constructor(props) {
    super(props);
    this.constraints = constraints;
  }

  render() {
    const {
      application: {
        firstName,
        email,
      },
    } = this.props;

    return (
      <HackerApplicationPageTemplate {...this.getPageTemplateProps()}>
        <h2>Nice to meet you, {firstName}! <span role="img" aria-label="wavinghands">👋</span></h2>
        <p>
          Help us get to know you better by providing as many links as you feel will support your application.
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
          onBlur={() => this.setFieldAsBlurred('email')}
          error={this.getErrorIfBlurred('email')}
          />
      </HackerApplicationPageTemplate>
    );
  }
}

export default PageTwo;
