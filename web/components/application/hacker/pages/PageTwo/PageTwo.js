import React from 'react';

import { TextInput, TextArea } from '../../../../input/text';
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
        githubLink,
        personalWebsiteLink,
        linkedInLink,
        resumeLink,
        interestForNwHacks,
        recentProject,
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
        <TextInput
          label="Github/BitBucket/Github link (optional)"
          name="github-link"
          className="margin-ends-giga"
          placeholder="https://github.com/JohnDoe"
          value={githubLink}
          onChange={newGithubLink => this.updateApplication({ githubLink: newGithubLink })}
          // onBlur={() => this.setFieldAsBlurred('githubLink')}
          error={this.getErrorIfBlurred('githubLink')}
          />
          <TextInput
          label="Personal website/portfolio link (optional)"
          name="personal-website-link"
          className="margin-ends-giga"
          placeholder="https://johndoe.com/"
          value={personalWebsiteLink}
          onChange={newPersonalWebsiteLink => this.updateApplication({ personalWebsiteLink: newPersonalWebsiteLink })}
          // onBlur={() => this.setFieldAsBlurred('personalWebsiteLink')}
          error={this.getErrorIfBlurred('personalWebsiteLink')}
          />
          <TextInput
          label="LinkedIn (optional)"
          name="linkedin-link"
          className="margin-ends-giga"
          placeholder="https://www.linkedin.com/in/johndoe/"
          value={linkedInLink}
          onChange={newLinkedInLink => this.updateApplication({ linkedInLink: newLinkedInLink })}
          // onBlur={() => this.setFieldAsBlurred('linkedInLink')}
          error={this.getErrorIfBlurred('linkedInLink')}
          />
          <TextInput
          label="Resume"
          name="resume-link"
          className="margin-ends-giga"
          placeholder="https://drive.google.com/open?id=0B0GZwoww_XiFMHJENWlYN0R2RlE"
          value={resumeLink}
          onChange={newResumeLink => this.updateApplication({ resumeLink: newResumeLink })}
          onBlur={() => this.setFieldAsBlurred('resumeLink')}
          error={this.getErrorIfBlurred('resumeLink')}
          />
          <TextArea
          label="🏗️ What are you interested in building at nwHacks? Tell us about an idea you have, and why it gets you excited."
          name="resume-link"
          className="margin-ends-giga"
          placeholder="Max 250 words"
          value={interestForNwHacks}
          maxLength={250}
          rows={7}
          onChange={newInterestForNwHacks => this.updateApplication({ interestForNwHacks: newInterestForNwHacks })}
          onBlur={() => this.setFieldAsBlurred('interestForNwHacks')}
          error={this.getErrorIfBlurred('interestForNwHacks')}
          />
          <TextArea
          label="🏅 Tell us about a recent project you’ve worked on that you're proud of! (It doesn't have to be technical)"
          name="resume-link"
          className="margin-ends-giga"
          placeholder="Max 250 words"
          value={recentProject}
          maxLength={250}
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
