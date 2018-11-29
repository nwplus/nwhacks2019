import React from 'react';

import { TextInput } from '../../../../input/text';
import { HackerApplicationPageTemplate } from '../PageTemplate';
import { Page } from '../../../Page';
import { constraints } from './PageOneConstraints';
import { SelectCity } from '../../../../input/select/SelectCity';
import { Select } from '../../../../input/select';
import { RadioButton, RadioGroup } from '../../../../input/buttons/RadioGroup';

import { schools } from '../../../schools';
import { genders } from '../../../genders';
import { levelsOfEducation } from '../../../education';
import { majors } from '../../../majors';
import { ethnicities } from '../../../ethnicity';

import books from '../../../../../assets/emoji/book.svg';
import mountain from '../../../../../assets/emoji/mountain.svg';

class PageOne extends Page {
  constructor(props) {
    super(props);

    this.constraints = constraints;

    const {
      application: {
        city,
      },
    } = this.props;

    this.state.cityQuery = city;
  }

  isEducationChosen = education => education === levelsOfEducation[0]
                                      || education === levelsOfEducation[1]
                                      || education === levelsOfEducation[2]

  isHighSchool = education => education === levelsOfEducation[0]

  render() {
    const {
      application: {
        firstName,
        lastName,
        email,
        confirmEmail,
        city,
        school,
        gender,
        isOver19,
        education,
        gradYear,
        major,
        phoneNumber,
        ethnicity,
      },
    } = this.props;

    const {
      cityQuery,
    } = this.state;

    return (
      <HackerApplicationPageTemplate {...this.getPageTemplateProps()}>
        <h1>About you <img className="emoji emoji-h1" alt="📚" src={books} /></h1>
        <p>
          {'nwHacks is Western Canada’s largest collegiate hackathon taking place on January 26th - 27th 2019 at the University of British Columbia. Join our team for 24 hours to get a snippet of what it’s like to organize a hackathon! Responsibilities include but not limited to registration, set-up/take-down, and more. Befriend some passionate hackers while distributing (and eating) midnight snacks. Volunteer hours are flexible and food & drinks will be provided.'}
          <img className="emoji" alt="⛰️" src={mountain} />
        </p>
        <TextInput
          label="What is your first name?"
          placeholder="First Name"
          name="first-name"
          className="margin-ends-giga"
          value={firstName}
          onChange={(newFirstName) => {
            this.updateApplication({
              firstName: newFirstName,
            });
          }}
          onBlur={() => this.setFieldAsBlurred('firstName')}
          error={this.getErrorIfBlurred('firstName')}
          />
        <TextInput
          placeholder="Last Name"
          label="What is your last name?"
          name="last-name"
          className="margin-ends-giga"
          value={lastName}
          onChange={(newLastName) => {
            this.updateApplication({
              lastName: newLastName,
            });
          }}
          onBlur={() => this.setFieldAsBlurred('lastName')}
          error={this.getErrorIfBlurred('lastName')}
          />
        <TextInput
          label="What is your email?"
          placeholder="hacker@email.com"
          name="hacker-application-email"
          value={email}
          className="margin-ends-giga"
          onChange={(newEmail) => {
            this.updateApplication({
              email: newEmail,
            });
          }}
          onBlur={() => this.setFieldAsBlurred('email')}
          error={this.getErrorIfBlurred('email')}
          />
        <TextInput
          label="Please re-enter your email"
          placeholder="hacker@email.com"
          name="hacker-application-confirm-email"
          value={confirmEmail}
          className="margin-ends-giga"
          onChange={(newEmail) => {
            this.updateApplication({
              confirmEmail: newEmail,
            });
          }}
          onBlur={() => this.setFieldAsBlurred('confirmEmail')}
          error={this.getErrorIfBlurred('confirmEmail')}
          />
        <TextInput
          label="What is your phone number?"
          placeholder="123-456-7890"
          name="phone-number"
          value={phoneNumber}
          className="margin-ends-giga"
          onChange={(newPhoneNumber) => {
            this.updateApplication({
              phoneNumber: newPhoneNumber,
            });
          }}
          onBlur={() => this.setFieldAsBlurred('phoneNumber')}
          error={this.getErrorIfBlurred('phoneNumber')}
          />
        <Select
          options={genders}
          value={gender}
          name="gender"
          label="Which gender do you identify as?"
          placeholder="Enter your gender or choose from the dropdown"
          className="margin-ends-giga"
          onChange={({ value: newGender }) => this.updateApplication({ gender: newGender })}
          onBlur={() => this.setFieldAsBlurred('gender')}
          error={this.getErrorIfBlurred('gender')}
          isSearchable
          allowNewOption
          />
        <Select
          options={ethnicities}
          value={ethnicity}
          name="ethnicity"
          label="What is your race/ethnicity?"
          placeholder="Enter your race/ethnicity or choose from the dropdown"
          className="margin-ends-giga"
          onChange={({ value: newEthnicity }) => this.updateApplication({
            ethnicity: newEthnicity,
          })}
          onBlur={() => this.setFieldAsBlurred('ethnicity')}
          error={this.getErrorIfBlurred('ethnicity')}
          isSearchable
          allowNewOption
          />
        <RadioGroup
          name="isOver19"
          label="Are you over 19?"
          className="dir-row margin-ends-giga"
          onChange={(newIsOver19) => {
            newIsOver19 = newIsOver19 === 'true';
            this.updateApplication({ isOver19: newIsOver19 });
          }}>
          <RadioButton
            label="Yes"
            value="true"
            selected={isOver19 === true}
              />
          <RadioButton
            label="No"
            value="false"
            selected={isOver19 === false}
              />
        </RadioGroup>
        <Select
          options={levelsOfEducation}
          value={education}
          name="education-level"
          label="What level of education are you currently studying at?"
          className="margin-ends-giga"
          onChange={({ value: newEducation }) => this.updateApplication({
            education: newEducation,
          })}
          onBlur={() => this.setFieldAsBlurred('education')}
          error={this.getErrorIfBlurred('education')}
          />
        { this.isEducationChosen(education)
          ? (
            <Select
              options={majors}
              value={major}
              name="major"
              label={this.isHighSchool(education) ? 'What do you plan on studying?' : 'What is your major?'}
              placeholder="Enter your major or choose from the dropdown"
              className="margin-ends-giga"
              onChange={({ value: newMajor }) => this.updateApplication({
                major: newMajor,
              })}
              onBlur={() => this.setFieldAsBlurred('major')}
              error={this.getErrorIfBlurred('major')}
              isSearchable
              allowNewOption
          />
          )
          : null
        }
        <Select
          options={schools}
          value={school}
          name="school-name"
          label="What school do you currently attend?"
          placeholder="Enter your school or choose from the dropdown"
          className="margin-ends-giga"
          onChange={({ value: newSchool }) => this.updateApplication({ school: newSchool })}
          onBlur={() => this.setFieldAsBlurred('school')}
          error={this.getErrorIfBlurred('school')}
          isSearchable
          allowNewOption
          />
        <TextInput
          label="What is your graduation year?"
          placeholder="20--"
          name="graduation-year"
          className="margin-ends-giga"
          value={gradYear}
          onChange={newGradYear => this.updateApplication({ gradYear: newGradYear })}
          onBlur={() => this.setFieldAsBlurred('gradYear')}
          error={this.getErrorIfBlurred('gradYear')}
          />
        <SelectCity
          inputValue={cityQuery}
          value={city}
          onChange={newCityQuery => this.setState({ cityQuery: newCityQuery })}
          onSelect={newCity => this.updateApplication({ city: newCity })}
          onBlur={() => this.setFieldAsBlurred('city')}
          error={this.getErrorIfBlurred('city')}
          className="margin-ends-giga"
          />
      </HackerApplicationPageTemplate>
    );
  }
}

export default PageOne;
