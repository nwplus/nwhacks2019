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
        birthday,
        education,
        gradYear,
        travel,
        major,
        phoneNumber,
        ethnicity,
      },
    } = this.props;

    const {
      cityQuery,
      genderQuery,
    } = this.state;

    return (
      <HackerApplicationPageTemplate {...this.getPageTemplateProps()}>
        <h1>About you <img className="emoji emoji-h1" alt="📚" src={books} /></h1>
        <p>
          {"nwHacks is Western Canada’s largest collegiate hackathon taking place on January 26th - 27th, 2019 at the University of British Columbia. We focus on creating a quality hackathon experience all of our attendees but historically we've had more applicants than we would be able to accommodate at our event. So, for a fair assessment of your application, we encourage you to put your best foot forward on this journey!"}
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
          label="What is your last name?"
          placeholder="Last Name"
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
          options={genderQuery && genderQuery.length > 0 ? genders : []}
          value={gender}
          name="gender"
          label="Which gender do you identify as?"
          placeholder="Type your gender"
          className="margin-ends-giga"
          onChange={({ value: newGender }) => this.updateApplication({ gender: newGender })}
          onBlur={() => this.setFieldAsBlurred('gender')}
          error={this.getErrorIfBlurred('gender')}
          inputValue={genderQuery}
          onInputChange={(input) => this.setState({ genderQuery: input })}
          isSearchable
          allowNewOption
          />
        <Select
          options={ethnicities}
          value={ethnicity}
          name="ethnicity"
          label="What is your race/ethnicity?"
          placeholder="Type your race/ethnicity"
          className="margin-ends-giga"
          onChange={({ value: newEthnicity }) => this.updateApplication({
            ethnicity: newEthnicity,
          })}
          onBlur={() => this.setFieldAsBlurred('ethnicity')}
          error={this.getErrorIfBlurred('ethnicity')}
          isSearchable
          allowNewOption
          />
        <TextInput
          label="When is your birthday? (YYYY-MM-DD)"
          placeholder="YYYY-MM-DD"
          name="birthday"
          value={birthday}
          className="margin-ends-giga"
          onChange={(newBirthday) => {
            this.updateApplication({
              birthday: newBirthday,
            });
          }}
          onBlur={() => this.setFieldAsBlurred('birthday')}
          error={this.getErrorIfBlurred('birthday')}
          />
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
              placeholder="Type your major"
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
          placeholder="Type your school"
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
        <p>
          {'Would you like to apply for a travel reimbursement? If you are coming from the University of Washington, or the surrounding area, we will be providing shuttle busses.'}
        </p>
        <p>
          {'Note: If selected to participate, we will be subsidizing a maximum of $200 CAD and you must submit this application by 11:59PM PST Dec 1st, 2018.'}
        </p>
        <RadioGroup
          name="travel-reimbursement"
          className="dir-col margin-bottom-giga"
          onChange={newTravel => this.updateApplication({ travel: parseInt(newTravel, 10) })}
          >
          <RadioButton
            label="No, I will not need a travel reimbursement."
            value="0"
            selected={travel === 0}
            />
          <RadioButton
            label="Yes, I would like to apply for a travel reimbursement."
            value="1"
            selected={travel === 1}
            />
          <RadioButton
            label="No, but I would like a seat on the bus from the Seattle/UW area."
            value="2"
            selected={travel === 2}
            />
        </RadioGroup>
      </HackerApplicationPageTemplate>
    );
  }
}

export default PageOne;
