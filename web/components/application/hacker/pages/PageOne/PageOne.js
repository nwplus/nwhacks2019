import React from 'react';

import { TextInput } from '../../../../input/text';
import { HackerApplicationPageTemplate } from '../PageTemplate';
import { Page } from '../../../Page';
import { constraints } from './PageOneConstraints';
import { SelectCity } from '../../../../input/select/SelectCity';
import { Select } from '../../../../input/select';
import { schools } from '../../../schools';

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
          label="First Name"
          name="first-name"
          className="margin-ends-l"
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
          label="Last Name"
          name="last-name"
          className="margin-ends-l"
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
          options={schools}
          value={school}
          name="school-name"
          label="What school do you currently attend?"
          className="margin-ends-l"
          onChange={({ value: newSchool }) => this.updateApplication({ school: newSchool })}
          onBlur={() => this.setFieldAsBlurred('school')}
          error={this.getErrorIfBlurred('school')}
          isSearchable
          allowNewOption
          />
        <SelectCity
          inputValue={cityQuery}
          value={city}
          onChange={newCityQuery => this.setState({ cityQuery: newCityQuery })}
          onSelect={newCity => this.updateApplication({ city: newCity })}
          onBlur={() => this.setFieldAsBlurred('city')}
          error={this.getErrorIfBlurred('city')}
          className="margin-ends-l"
          />
      </HackerApplicationPageTemplate>
    );
  }
}

export default PageOne;
