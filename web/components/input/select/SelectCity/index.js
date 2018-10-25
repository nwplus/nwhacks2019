import React from 'react';
import debounce from 'lodash.debounce';
import { Select } from '../';

// based on https://github.com/hibiken/react-places-autocomplete/blob/master/src/PlacesAutocomplete.js

export class SelectCity extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      suggestions: [],
      userInputValue: '',
    };

    this.debouncedFetchPredictions = debounce(
      this.fetchPredictions
    );
  }

  componentDidMount() {
    if (!window.google) {
      throw new Error(
        '[react-places-autocomplete]: Google Maps JavaScript API library must be loaded. See: https://github.com/kenny-hibino/react-places-autocomplete#load-google-library'
      );
    }

    if (!window.google.maps.places) {
      throw new Error(
        '[react-places-autocomplete]: Google Maps Places library must be loaded. Please add `libraries=places` to the src URL. See: https://github.com/kenny-hibino/react-places-autocomplete#load-google-library'
      );
    }

    this.autocompleteService = new window.google.maps.places.AutocompleteService();
    this.autocompleteOK = window.google.maps.places.PlacesServiceStatus.OK;
    this.setState({ ready: true });
  }

  autocompleteCallback = (predictions, status) => {
    this.setState({ loading: false });
    if (status !== this.autocompleteOK) {
      this.clearSuggestions();
      return;
    }
    this.setState({
      suggestions: predictions.map((p) => p.description),
    });
  }

  fetchPredictions = () => {
    const { userInputValue: value } = this.state;
    if (value.length) {
      this.setState({ loading: true });
      this.autocompleteService.getPlacePredictions(
        {
          types: ['(cities)'],
          input: value,
        },
        this.autocompleteCallback
      );
    }
  }

  clearSuggestions = () => {
    this.setState({ suggestions: [] });
  };

  handleInputChange = value => {
    this.setState({ userInputValue: value });
    if (!value) {
      this.clearSuggestions();
      return;
    }
    this.debouncedFetchPredictions();
  };

  render() {
    const { suggestions } = this.state;

    return (
      <Select
        name="some_select"
        label="Regular drop-down input"
        onChange={this.props.onSelect}
        onInputChange={(value) => this.handleInputChange(value)}
        options={suggestions}
        isSearchable
        />
    );
  }
}
