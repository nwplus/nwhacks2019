import React from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';

import { TextInput } from '../../../../input/text';
import { HackerApplicationPageTemplate } from '../PageTemplate';
import { Page } from '../../../Page';
import { constraints } from './PageOneConstraints';
// import { Select } from '../../../../input/select';

class PageOne extends Page {
  constructor(props) {
    super(props);
    this.constraints = constraints;
    this.state.cityQuery = "";
  }

  render() {
    const {
      application: {
        firstName,
        lastName,
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
        <PlacesAutocomplete
          value={cityQuery}
          onChange={(change) => this.setState({ cityQuery: change })}
          onSelect={(select) => console.log(select)}
          searchOptions={{
            types: ['(cities)'],
          }}
        >
          {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
            <div>
              <input
                {...getInputProps({
                  placeholder: 'Search Places ...',
                  className: 'location-search-input',
                })}
              />
              <div className="autocomplete-dropdown-container">
                {loading && <div>Loading...</div>}
                {suggestions.map(suggestion => {
                  const className = suggestion.active
                    ? 'suggestion-item--active'
                    : 'suggestion-item';
                  // inline style for demonstration purpose
                  const style = suggestion.active
                    ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                    : { backgroundColor: '#ffffff', cursor: 'pointer' };
                  return (
                    <div
                      {...getSuggestionItemProps(suggestion, {
                        className,
                        style,
                      })}
                    >
                      <span>{suggestion.description}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </PlacesAutocomplete>
      </HackerApplicationPageTemplate>
    );
  }
}

export default PageOne;
