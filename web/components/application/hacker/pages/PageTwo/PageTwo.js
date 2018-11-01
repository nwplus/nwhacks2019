import React from 'react';

import { TextInput, TextArea } from '../../../../input/text';
import { HackerApplicationPageTemplate } from '../PageTemplate';
import { Page } from '../../../Page';
import { constraints } from './PageTwoConstraints';
import { RadioButton, RadioGroup } from '../../../../input/buttons/RadioGroup';
import { Checkbox, CheckboxGroup } from '../../../../input/buttons/CheckboxGroup';

// Emojis
import crane from '../../../../../assets/emoji/crane.svg';
import medal from '../../../../../assets/emoji/medal.svg';

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
        isDeveloper,
        isDesigner,
        isHardware,
        isOther,
        githubLink,
        personalWebsiteLink,
        linkedInLink,
        resumeLink,
        interestForNwHacks,
        recentProject,
      },
    } = this.props;

    return (
      <HackerApplicationPageTemplate {...this.getPageTemplateProps()}>
        <h2>Nice to meet you, {firstName}! <span role="img" aria-label="wavinghands">👋</span></h2>
        <p>Help us get to know you better by providing as many links as
           you feel will support your application.
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

        <CheckboxGroup
          name="interested-role-checkbox"
          label="How do you wish to contribute at nwHacks? Your choice will not affect your application and you can always change your mind."
          className="dir-row margin-ends-s"
        >
          <Checkbox
            label="Developer"
            value="developer"
            checked={isDeveloper}
            className="margin-left-none"
            onChange={(e) => {
              this.updateApplication({ isDeveloper: e.target.checked });
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

        <TextInput
          label="Github/BitBucket/GitLab link (recommended)"
          name="github-link"
          className="margin-ends-giga"
          placeholder="https://github.com/JohnDoe"
          value={githubLink}
          onChange={newGithubLink => this.updateApplication({ githubLink: newGithubLink })}
          onBlur={() => this.setFieldAsBlurred('githubLink')}
          error={this.getErrorIfBlurred('githubLink')}
        />
        <TextInput
          label="Personal website/portfolio link (recommended)"
          name="personal-website-link"
          className="margin-ends-giga"
          placeholder="https://johndoe.com/"
          value={personalWebsiteLink}
          onChange={newPersonalWebsiteLink => this.updateApplication({
            personalWebsiteLink: newPersonalWebsiteLink })}
          onBlur={() => this.setFieldAsBlurred('personalWebsiteLink')}
          error={this.getErrorIfBlurred('personalWebsiteLink')}
        />
        <TextInput
          label="LinkedIn (optional)"
          name="linkedin-link"
          className="margin-ends-giga"
          placeholder="https://www.linkedin.com/in/johndoe/"
          value={linkedInLink}
          onChange={newLinkedInLink => this.updateApplication({ linkedInLink: newLinkedInLink })}
          onBlur={() => this.setFieldAsBlurred('linkedInLink')}
          error={this.getErrorIfBlurred('linkedInLink')}
        />

        <TextInput
          label="Resume link (make sure the link is publicly accessible)"
          name="resume-link"
          className="margin-ends-giga"
          placeholder="https://drive.google.com/open?id=0B0GZwoww_XiFMHJENWlYN0R2RlE"
          value={resumeLink}
          onChange={newResumeLink => this.updateApplication({ resumeLink: newResumeLink })}
          onBlur={() => this.setFieldAsBlurred('resumeLink')}
          error={this.getErrorIfBlurred('resumeLink')}
        />
        <TextArea
          label={(<div><img className="vertical-align-top emoji" alt="🏗️" src={crane} /> What are you interested in building at nwHacks? Tell us about an idea you have, and why it gets you excited.</div>)}
          name="longanswer-1"
          className="margin-ends-giga"
          placeholder="Max 750 characters"
          value={interestForNwHacks}
          maxLength={750}
          rows={7}
          onChange={newInterestForNwHacks => this.updateApplication({
            interestForNwHacks: newInterestForNwHacks })}
          onBlur={() => this.setFieldAsBlurred('interestForNwHacks')}
          error={this.getErrorIfBlurred('interestForNwHacks')}
        />
        <TextArea
          label={(<div><img className="vertical-align-top emoji" alt="🏅" src={medal} /> Tell us about a recent project you&apos;ve worked on that you&apos;re proud of! (It doesn&apos;t have to be technical)</div>)}
          name="longanswer-2"
          className="margin-ends-giga"
          placeholder="Max 750 characters"
          value={recentProject}
          maxLength={750}
          rows={7}
          onChange={newRecentProject => this.updateApplication({ recentProject: newRecentProject })}
          onBlur={() => this.setFieldAsBlurred('recentProject')}
          error={this.getErrorIfBlurred('recentProject')}
        />
      </HackerApplicationPageTemplate>
    );
  }
}

export default PageTwo;
