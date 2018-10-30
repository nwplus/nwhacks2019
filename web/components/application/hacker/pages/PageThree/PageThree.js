import React from 'react';

import { HackerApplicationPageTemplate } from '../PageTemplate';
import { Page } from '../../../Page';
import { constraints } from './PageThreeConstraints';
import { Select } from '../../../../input/select';
import { Checkbox, CheckboxGroup } from '../../../../input/buttons/CheckboxGroup';
import { sources } from '../../../sources';

// Emojis
import robot from '../../../../../assets/emoji/robot.svg';
import floppy from '../../../../../assets/emoji/floppy.svg';
import briefcase from '../../../../../assets/emoji/briefcase.svg';

class PageThree extends Page {
  constructor(props) {
    super(props);
    this.constraints = constraints;
  }

  render() {
    const {
      application: {
        source,
        isPrivacyPolicyChecked,
        isCodeOfConductChecked,
        isDataReportingChecked,
        isDocumentsChecked,
      },
    } = this.props;

    return (
      <HackerApplicationPageTemplate {...this.getPageTemplateProps()}>
        <h2>Almost there...</h2>

        <Select
          options={sources}
          value={source}
          name="source"
          label="How did you hear about nwHacks?"
          placeholder="Select an option"
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

        <CheckboxGroup
          name="data-checkbox"
          label={(
            <div><img className="vertical-align-top emoji" alt="🏅" src={floppy} /> We use
              your (anonymized!) data to help you get the best sponsors and continuously improve
              nwHacks with each iteration.
            </div>
          )}
          className="margin-top-s dir-row margin-bottom-giga"
        >
          <Checkbox
            label={(
              <div className="bold"> I authorize nwPlus to use my anonymized data for data reporting.</div>)}
            value="isDataReportingChecked"
            checked={isDataReportingChecked}
            onChange={(e) => {
              this.updateApplication({ isDataReportingChecked: e.target.checked });
            }}
          />
        </CheckboxGroup>

        <CheckboxGroup
          name="documents-checkbox"
          label={(
            <div><img className="vertical-align-top emoji" alt="🏅" src={briefcase} /> Our hackathon
              aims to connect you with industry professionals, recruiters, and career opportunities.
              In doing so, information about our hackers is needed in order for attending companies
              to contact you.
            </div>)}
          className="margin-top-s dir-row"
        >
          <Checkbox
            label={(
              <div className="bold"> I authorize nwPlus to provide my resume and supporting documents
                (Github, Linkedin, etc) to event sponsors for recruitment purposes upon request.
              </div>)}
            value="isDocumentsChecked"
            checked={isDocumentsChecked}
            onChange={(e) => {
              this.updateApplication({ isDocumentsChecked: e.target.checked });
            }}
          />
        </CheckboxGroup>
      </HackerApplicationPageTemplate>
    );
  }
}

export default PageThree;
