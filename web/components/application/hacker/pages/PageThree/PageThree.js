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
        isCheckedPrivacyPolicy,
        isCheckedCodeOfConduct,
        isCheckedDataReporting,
        isCheckedDocuments,
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
          className="margin-ends-giga"
          onChange={({ value: newSource }) => this.updateApplication({ source: newSource })}
          onBlur={() => this.setFieldAsBlurred('source')}
          error={this.getErrorIfBlurred('source')}
          isSearchable
          allowNewOption
          />

        <CheckboxGroup
          name="MLH-checkbox"
          label={<div><img className="vertical-align-top emoji" alt="🏅" src={robot}/> We participate in Major League Hacking (MLH) 
            as a MLH Member Event. You authorize us to share certain application/registration information for event administration, 
            ranking, MLH administration, and occasional messages about hackathons in line with 
            the <a href="https://static.mlh.io/docs/mlh-code-of-conduct.pdf" target="_blank">MLH Code of Conduct.</a></div>}
          className="dir-row margin-ends-giga"
        >
          <Checkbox
            label={<div>I authorize nwPlus to share certain application/registration information for event administration, ranking, 
              MLH administration, and occasional messages about hackathons in line with 
              the <a href="https://mlh.io/privacy" target="_blank"> MLH Privacy Policy.</a></div>}
            value="isCheckedPrivacyPolicy"
            checked={isCheckedPrivacyPolicy}
            className=""
            onChange={(e) => {
              this.updateApplication({ isCheckedPrivacyPolicy: e.target.checked });
            }}
          />
          <Checkbox
            label={<div>I have read and agree to 
              the <a href="https://static.mlh.io/docs/mlh-code-of-conduct.pdf" target="_blank"> Major League Hacking Code of Conduct.</a></div>}
            value="isCheckedCodeOfConduct"
            checked={isCheckedCodeOfConduct}
            className="margin-left-none"
            onChange={(e) => {
              this.updateApplication({ isCheckedCodeOfConduct: e.target.checked });
            }}
          />
        </CheckboxGroup>

        <CheckboxGroup
          name="interested-role-checkbox"
          label={<div><img className="vertical-align-top emoji" alt="🏅" src={floppy}/> We use your (anonymized!) data to help you get the best sponsors and continuously improve nwHacks with each iteration.</div>}
          className="dir-row margin-ends-giga"
        >
          <Checkbox
            label="I authorize nwPlus to use my anonymized data for data reporting."
            value="isCheckedDataReporting"
            checked={isCheckedDataReporting}
            className=""
            onChange={(e) => {
              this.updateApplication({ isCheckedDataReporting: e.target.checked });
            }}
          />
        </CheckboxGroup>

        <CheckboxGroup
          name="interested-role-checkbox"
          label={<div><img className="vertical-align-top emoji" alt="🏅" src={briefcase}/> Our hackathon aims to connect you with 
            industry professionals, recruiters, and career opportunities. In doing so, information about our hackers is needed in 
            order for attending companies to contact you.</div>}
          className="dir-row margin-ends-giga"
        >
          <Checkbox
            label="I authorize nwPlus to provide my resume and supporting documents (Github, Linkedin, etc) to event sponsors for recruitment purposes upon request."
            value="isCheckedDocuments"
            checked={isCheckedDocuments}
            className=""
            onChange={(e) => {
              this.updateApplication({ isCheckedDocuments: e.target.checked });
            }}
          />
        </CheckboxGroup>
      </HackerApplicationPageTemplate>
    );
  }
}

export default PageThree;
