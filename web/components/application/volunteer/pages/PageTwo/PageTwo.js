import React from 'react';

import { TextArea } from '../../../../input/text';
import { HackerApplicationPageTemplate } from '../PageTemplate';
import { Page } from '../../../Page';
import { RadioButton, RadioGroup } from '../../../../input/buttons/RadioGroup';
import { Checkbox, CheckboxGroup } from '../../../../input/buttons/CheckboxGroup';
import { constraints } from './PageTwoConstraints';

// Emojis
import crane from '../../../../../assets/emoji/crane.svg';
import { Select } from '../../../../input/select';
import { sources } from '../../../sources';
import robot from '../../../../../assets/emoji/robot.svg';

class PageTwo extends Page {
  constructor(props) {
    super(props);
    this.constraints = constraints;
  }

  render() {
    const {
      application: {
        firstName,
        interestForNwHacks,
        freeHours,
        dayOne0830To1300,
        dayOne1300To1800,
        dayOne1800To2300,
        dayOneOvernight,
        dayTwo0800To1200,
        dayTwo1200To1800,
        source,
        isPrivacyPolicyChecked,
        isCodeOfConductChecked,
      },
    } = this.props;

    return (
      <HackerApplicationPageTemplate {...this.getPageTemplateProps()}>
        <h2>Nice to meet you, {firstName}! <span role="img" aria-label="wavinghands">👋</span></h2>
        <p>Help us learn a little more about you and how you&#39;d like to help out at nwHacks 2019.
        </p>

        <TextArea
          label={(<div><img className="vertical-align-top emoji" alt="🏗️" src={crane} />Why would you like to volunteer at nwHacks?</div>)}
          name="longanswer-1"
          className="margin-ends-giga"
          placeholder="Max 250 characters"
          value={interestForNwHacks}
          maxLength={250}
          rows={5}
          onChange={newInterestForNwHacks => this.updateApplication({
            interestForNwHacks: newInterestForNwHacks })}
          onBlur={() => this.setFieldAsBlurred('interestForNwHacks')}
          error={this.getErrorIfBlurred('interestForNwHacks')}
          />
        <RadioGroup
          name="hours"
          label="How many hours would you like to volunteer for?"
          className="dir-row margin-ends-giga"
          onChange={(newhours) => {
            this.updateApplication({ freeHours: newhours });
          }}>
          <RadioButton
            label="5-8"
            value="5-8"
            selected={freeHours === '5-8'}
              />
          <RadioButton
            label="8-12"
            value="8-12"
            selected={freeHours === '8-12'}
              />
          <RadioButton
            label="12-16"
            value="12-16"
            selected={freeHours === '12-16'}
            />
          <RadioButton
            label="16-20"
            value="16-20"
            selected={freeHours === '16-20'}
            />
          <RadioButton
            label="full event"
            value="full event"
            selected={freeHours === 'full event'}
            />
        </RadioGroup>
        <p> Check all time slots that you are available for: </p>
        <CheckboxGroup
          name="timeslotday1-checkbox"
          label="Saturday January 26th"
          className="dir-row margin-ends-s"
         >
          <Checkbox
            label="8:30AM to 1PM"
            value="False"
            checked={dayOne0830To1300}
            className="margin-left-none"
            onChange={(e) => {
              this.updateApplication({ dayOne0830To1300: e.target.checked });
            }}
         />

          <Checkbox
            label="1PM to 6PM"
            value="False"
            checked={dayOne1300To1800}
            className="margin-left-none"
            onChange={(e) => {
              this.updateApplication({ dayOne1300To1800: e.target.checked });
            }}
         />
          <Checkbox
            label="6PM to 11PM"
            value="False"
            checked={dayOne1800To2300}
            className="margin-left-none"
            onChange={(e) => {
              this.updateApplication({ dayOne1800To2300: e.target.checked });
            }}
         />
          <Checkbox
            label="Overnight"
            value="False"
            checked={dayOneOvernight}
            className="margin-left-none"
            onChange={(e) => {
              this.updateApplication({ dayOneOvernight: e.target.checked });
            }}
         />
        </CheckboxGroup>
        <CheckboxGroup
          name="timeslotday2-checkbox"
          label="Sunday January 27th"
          className="dir-row margin-ends-s"
         >
          <Checkbox
            label="8AM to 12PM"
            value="False"
            checked={dayTwo0800To1200}
            className="margin-left-none"
            onChange={(e) => {
              this.updateApplication({ dayTwo0800To1200: e.target.checked });
            }}
         />

          <Checkbox
            label="12PM to 6PM"
            value="False"
            checked={dayTwo1200To1800}
            className="margin-left-none"
            onChange={(e) => {
              this.updateApplication({ dayTwo1200To1800: e.target.checked });
            }}
         />
        </CheckboxGroup>
        <Select
          options={sources}
          value={source}
          name="source"
          label="How did you hear about nwHacks?"
          placeholder="Enter an option or choose from the dropdown"
          className="margin-top-mega margin-bottom-xxl"
          onChange={({ value: newSource }) => this.updateApplication({ source: newSource })}
          onBlur={() => this.setFieldAsBlurred('source')}
          error={this.getErrorIfBlurred('source')}
          isSearchable
          allowNewOption
              />
        <CheckboxGroup
          name="MLH-checkbox"
          label={(
            <div><img className="vertical-align-top emoji" alt="🏅" src={robot} /> We participate
                      in Major League Hacking (MLH) as a MLH Member Event.
                      You authorize us to share
                      certain application/registration information for event administration,
                      ranking, MLH administration,
                      and occasional messages about hackathons in line with
                      the <a href="https://static.mlh.io/docs/mlh-code-of-conduct.pdf" target="_blank" rel="noopener noreferrer">MLH Code of Conduct.</a>
            </div>)}
          className="margin-top-s dir-row margin-bottom-giga"
          >
          <Checkbox
            label={(
              <div className="bold">I authorize nwPlus to share certain application/registration information
                          for event administration, ranking.
                          MLH administration, and occasional messages
                          about hackathons in line with
                          the <a href="https://mlh.io/privacy" target="_blank" rel="noopener noreferrer"> MLH Privacy Policy.</a>
              </div>)}
            value="isPrivacyPolicyChecked"
            checked={isPrivacyPolicyChecked}
            onChange={(e) => {
              this.updateApplication({ isPrivacyPolicyChecked: e.target.checked });
            }}
              />
          <Checkbox
            label={(
              <div className="bold">I have read and agree to
                          the <a href="https://static.mlh.io/docs/mlh-code-of-conduct.pdf" target="_blank" rel="noopener noreferrer"> Major League Hacking Code of Conduct.</a>
              </div>
                  )}
            value="isCodeOfConductChecked"
            checked={isCodeOfConductChecked}
            onChange={(e) => {
              this.updateApplication({ isCodeOfConductChecked: e.target.checked });
            }}
              />
        </CheckboxGroup>
      </HackerApplicationPageTemplate>
    );
  }
}
export default PageTwo;
