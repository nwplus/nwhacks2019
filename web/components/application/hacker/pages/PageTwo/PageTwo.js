import React from 'react';

import { TextInput } from '../../../../input/text';
import { HackerApplicationPageTemplate } from '../PageTemplate';
import { Page } from '../../../Page';
import { constraints } from './PageTwoConstraints';
import { RadioButton, RadioGroup } from '../../../../input/buttons/RadioGroup';

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
        isFirstHackathon,
        email,
      },
    } = this.props;

    return (
      <HackerApplicationPageTemplate {...this.getPageTemplateProps()}>
        <h2>Nice to meet you, {firstName}! <span role="img" aria-label="wavinghands">👋</span></h2>
        <p>
          Help us get to know you better by providing as many links as you feel will support your application.
        </p>

        <RadioGroup
          name="first-hackathon"
          label="Is this your first hackathon?"
          className="dir-row margin-ends-giga"
          onChange={(newIsFirstHackathon) => {
            newIsFirstHackathon = newIsFirstHackathon === 'true';
            this.updateApplication({ isFirstHackathon: newIsFirstHackathon });
          }
          }
        >
          <RadioButton
            label="Yes"
            value="true"
            selected={isFirstHackathon === true}
          />
          <RadioButton
            label="No"
            value="false"
            selected={isFirstHackathon === false}
          />
        </RadioGroup>

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
