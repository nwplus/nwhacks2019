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

  render() {
    const {
      application: {
        firstName,
        lastName,
        city,
        school,
        gender,
        isAdult,
        education,
        gradYear,
        travel,
      },
    } = this.props;

    const {
      cityQuery,
    } = this.state;

    return (
      <HackerApplicationPageTemplate {...this.getPageTemplateProps()}>
        <h1>About you <span role="img" aria-label="book">📚</span></h1>
        <p>
        nwHacks is Western Canada’s largest collegiate hackathon taking place
        on January 26th - 27th, 2019 at the University of British Columbia.
        As expected, we receive a large number of applications every year.
        We focus on curating a quality hackathon experience for each attendee.
        For a fair assessment of your application,
        we encourage you to put your best foot forward on this journey!<span role="img" aria-label="mountain">⛰️</span>
        </p>
        <TextInput
          label="What is your first name?"
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
        <Select
          options={genders}
          value={gender}
          name="gender"
          label="What gender do you identify as?"
          className="margin-ends-giga"
          onChange={({ value: newGender }) => this.updateApplication({ gender: newGender })}
          onBlur={() => this.setFieldAsBlurred('gender')}
          error={this.getErrorIfBlurred('gender')}
          isSearchable
          allowNewOption
          />
        <RadioGroup
          name="age-19-or-older"
          label="Will you be 19 years of age or older by January 26th, 2019?"
          className="dir-row margin-ends-giga"
          onChange={(newIsAdult) => {
            newIsAdult = newIsAdult === 'true';
            this.updateApplication({ isAdult: newIsAdult });
          }
          }
          >
          <RadioButton
            label="Yes"
            value="true"
            selected={isAdult === true}
            />
          <RadioButton
            label="No"
            value="false"
            selected={isAdult === false}
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
        <Select
          options={schools}
          value={school}
          name="school-name"
          label="What school do you currently attend?"
          className="margin-ends-giga"
          onChange={({ value: newSchool }) => this.updateApplication({ school: newSchool })}
          onBlur={() => this.setFieldAsBlurred('school')}
          error={this.getErrorIfBlurred('school')}
          isSearchable
          allowNewOption
          />
        <TextInput
          label="What is your graduation year?"
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
