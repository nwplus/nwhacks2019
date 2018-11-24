import React from 'react';

import { TextInput, TextArea } from '../../../../input/text';
import { HackerApplicationPageTemplate } from '../PageTemplate';
import { Page } from '../../../Page';
import { RadioButton, RadioGroup } from '../../../../input/buttons/RadioGroup';
import { Checkbox, CheckboxGroup } from '../../../../input/buttons/CheckboxGroup';

// Emojis
import crane from '../../../../../assets/emoji/crane.svg';
import medal from '../../../../../assets/emoji/medal.svg';
import {Select} from "../../../../input/select";
import {sources} from "../../../sources";
import robot from "../../../../../assets/emoji/robot.svg";

class PageTwo extends Page {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      application: {
        firstName,
        interestForNwHacks,
        hours,
        day1Availability,
        day2Availability,
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
          rows={4}
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
            this.updateApplication({ hours: newhours });
          }}>
          <RadioButton
            label="5-8"
            value="true"
            selected={hours === '5-8'}
              />
          <RadioButton
            label="8-12"
            value="false"
            selected={hours === '8-12'}
              />
          <RadioButton
            label="12-16"
            value="false"
            selected={hours === '12-16'}
            />
          <RadioButton
            label="16-20"
            value="false"
            selected={hours === '16-20'}
            />
          <RadioButton
            label="fullevent"
            value="false"
            selected={hours === 'fullevent'}
            />
        </RadioGroup>
              <CheckboxGroup
          name="interested-role-checkbox"
          label="Check all time slots that you are available for:"
          className="dir-row margin-ends-s"
        >
        <Checkbox
            label="8:30AM"
            value="8:30AM"
            checked={isDeveloper}
            className="margin-left-none"
            onChange={(e) => {
              this.updateApplication({ day1Availability: e.target.checked });
            }}
          />

          <Checkbox
            label="Designer"
            value="designer"
            checked={isDesigner}
            className="margin-left-none"
            onChange={(e) => {
              this.updateApplication({ isDesigner: e.target.checked });
            }}
          />
          <Checkbox
            label="Hardware/Robotics"
            value="hardware"
            checked={isHardware}
            className="margin-left-none"
            onChange={(e) => {
              this.updateApplication({ isHardware: e.target.checked });
            }}
          />
          <Checkbox
            label="Other"
            value="other"
            checked={isOther}
            className="margin-left-none"
            onChange={(e) => {
              this.updateApplication({ isOther: e.target.checked });
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
                      in Major League Hacking (MLH) as a MLH Member Event. You authorize us to share
                      certain application/registration information for event administration, ranking,
                      MLH administration, and occasional messages about hackathons in line with
                      the <a href="https://static.mlh.io/docs/mlh-code-of-conduct.pdf" target="_blank" rel="noopener noreferrer">MLH Code of Conduct.</a>
                  </div>)}
              className="margin-top-s dir-row margin-bottom-giga"
          >
              <Checkbox
                  label={(
                      <div className="bold">I authorize nwPlus to share certain application/registration information
                          for event administration, ranking, MLH administration, and occasional messages
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
