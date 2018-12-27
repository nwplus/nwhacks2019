import React from 'react';
import PropTypes from 'prop-types';
import { firebaseConnect, firestoreConnect, isLoaded } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';
import flat from 'flat';
import { Parser } from 'json2csv';
import { convertObjectPrimitivesToStrings } from '../../../util/object';

import AssessmentPage from '../../../components/admin/AssessmentPage';
import applicantCollections from '../../../util/applicantCollections';

class AssessmentPageContainer extends React.Component {
  static contextTypes = {
    store: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      applicantType: 'hacker',
      selectedApplicantId: null,
      isSelectingFilters: false,
      appliedFilters: [],
      areFiltersApplied: false,
      sortType: 'timestamp',
      sortDirection: 'asc',
    };
  }

  componentWillMount() {
    this.loadApplicants();
  }

  componentWillUnmount() {
    this.unloadApplicants();
  }

  // returns the currently applied filters
  getAppliedFilters = () => {
    const { appliedFilters } = this.state;
    return appliedFilters;
  }

  // handles selecting an applicant
  selectApplicant = (applicantId) => {
    this.setState({ selectedApplicantId: applicantId });
  }

  // Fills state.firestore.data.applicants by listening to <applicantType>_main_info collection
  loadApplicants = () => {
    const { store } = this.context;
    const { firestore } = store;
    const { applicantType } = this.state;
    firestore.setListener({
      collection: applicantCollections[applicantType].shortInfo,
      orderBy: 'timestamp',
    });
  }

  // Clears state.firestore.data.applicants by unlistening to <applicantType>_main_info collection
  unloadApplicants = () => {
    const { store } = this.context;
    const { firestore } = store;
    const { applicantType } = this.state;
    firestore.unsetListener({
      collection: applicantCollections[applicantType].shortInfo,
      orderBy: 'timestamp',
    });
  }

  // switches applicant types (hacker, mentor, volunteer)
  switchApplicantType = (newApplicantType) => {
    this.unloadApplicants(); // remove listener for old applicantType's collections
    this.setState({
      applicantType: newApplicantType,
      selectedApplicantId: null,
    }, () => {
      this.loadApplicants(); // add listener for new applicantType's collections
    });
  }

  // shows filter modal
  showFilterOptions = () => {
    this.setState({
      isSelectingFilters: true,
    });
  }

  // hides filter modal
  hideFilterOptions = () => {
    this.setState({
      isSelectingFilters: false,
    });
  }

  // applies a new set of filters
  applyFilters = (newFilters) => {
    const newFiltersExist = newFilters.length > 0;
    this.setState({
      isSelectingFilters: false,
      areFiltersApplied: newFiltersExist,
      appliedFilters: newFilters,
      filterExpression: this.compileFilters(newFilters),
    });
  }

  // handles filtering a list of applicants based on a filter expression
  filterApplicants = (applicants) => {
    const { filterExpression } = this.state;
    if (filterExpression) {
      applicants = applicants.filter((applicant) => {
        // flatten applicant object
        applicant = flat(applicant, { delimiter: '_' });
        // convert values in object to strings
        applicant = convertObjectPrimitivesToStrings(applicant);
        return filterExpression(applicant);
      });
    }
    return applicants;
  }

  // returns filter expression generated from filters
  compileFilters = (filters) => {
    const conditionals = [];
    // 1. Build array of conditionals
    for (let i = 0; i < filters.length; i += 1) {
      const filter = filters[i];
      const { selectedField, selectedOperator, selectedValue } = filter;
      const conditional = `applicant.${selectedField}${selectedOperator}"${selectedValue}"`;
      conditionals.push(conditional);
    }
    // 2. Combine array of condtionals into final conditional
    let finalConditional = '';
    for (let i = 0; i < conditionals.length; i += 1) {
      const conditional = conditionals[i];
      if (finalConditional.length === 0) {
        finalConditional += conditional;
      } else {
        finalConditional += '&&' + conditional;
      }
    }
    // 3. Build and return a filter expression based on final conditional
    if (finalConditional.length > 0) {
      // eslint-disable-next-line no-new-func
      return new Function(
        'applicant', // args
        `return ${finalConditional};` // body
      );
    }
    return null; // filter expression not defined if no filters exist
  }

  switchSortType = (newSortType) => {
    this.setState({
      sortType: newSortType,
      selectedApplicantId: null,
    });
  };

  sortApplicants = (sortType, applicants) => {
    switch (sortType) {
      case 'firstName':
        return applicants.sort((a, b) => {
          if (!a.firstName) return -1;
          if (!b.firstName) return 1;
          if (a.firstName.toUpperCase() > b.firstName.toUpperCase()) return 1;
          if (a.firstName.toUpperCase() < b.firstName.toUpperCase()) return -1;
          return 0;
        });
      case 'lastName':
        return applicants.sort((a, b) => {
          if (!a.lastName) return -1;
          if (!b.lastName) return 1;
          if (a.lastName.toUpperCase() > b.lastName.toUpperCase()) return 1;
          if (a.lastName.toUpperCase() < b.lastName.toUpperCase()) return -1;
          return 0;
        });
      case 'email':
        return applicants.sort((a, b) => {
          if (!a.email) return -1;
          if (!b.email) return 1;
          if (a.email.toUpperCase() > b.email.toUpperCase()) return 1;
          if (a.email.toUpperCase() < b.email.toUpperCase()) return -1;
          return 0;
        });
      case 'score':
        return applicants.sort((a, b) => {
          if (!a.score || !a.score.finalScore) return -1;
          if (!b.score || !b.score.finalScore) return 1;
          if (a.score.finalScore > b.score.finalScore) return 1;
          if (a.score.finalScore < b.score.finalScore) return -1;
          return 0;
        });
      case 'timestamp':
        return applicants.sort((a, b) => {
          if (!a.timestamp) return -1;
          if (!b.timestamp) return 1;
          if (a.timestamp > b.timestamp) return 1;
          if (a.timestamp < b.timestamp) return -1;
          return 0;
        });
      default:
        return applicants;
    }
  };

  switchSortDirection = () => {
    const { sortDirection } = this.state;
    const newSortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
    this.setState({ sortDirection: newSortDirection });
  };

  exportApplicants = () => {
    const {
      applicantType,
    } = this.state;

    const {
      firestore,
    } = this.props;
    const shortInfoCollectionName = applicantCollections[applicantType].shortInfo;
    const applicants = firestore.ordered[shortInfoCollectionName];
    const filteredApplicants = this.filterApplicants(applicants);
    const fields = ['firstName', 'lastName', 'email', 'id'];
    // https://www.npmjs.com/package/json2csv
    const json2csvParser = new Parser({ fields, quote: '' });
    const csv = json2csvParser.parse(filteredApplicants);
    const exportedFilename = 'applicants.csv';
    // https://stackoverflow.com/questions/14964035/how-to-export-javascript-array-info-to-csv-on-client-side/14966131#14966131
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    if (navigator.msSaveBlob) { // IE 10+
      navigator.msSaveBlob(blob, exportedFilename);
    } else {
      const link = document.createElement('a');
      if (link.download !== undefined) { // feature detection
        // Browsers that support HTML5 download attribute
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', exportedFilename);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }
  }

  render() {
    const {
      applicantType,
      selectedApplicantId,
      isSelectingFilters,
      areFiltersApplied,
      sortType,
      sortDirection,
    } = this.state;

    const {
      firestore,
    } = this.props;
    const shortInfoCollectionName = applicantCollections[applicantType].shortInfo;
    const applicants = firestore.ordered[shortInfoCollectionName];
    if (!isLoaded(applicants)) {
      return (<span>Loading...</span>);
    }
    const filteredApplicants = this.filterApplicants(applicants);
    let sortedApplicants = this.sortApplicants(sortType, filteredApplicants);
    if (sortDirection === 'desc') sortedApplicants = sortedApplicants.reverse();
    return (
      <div>
        <AssessmentPage
          applicantType={applicantType}
          applicants={sortedApplicants}
          selectedApplicantId={selectedApplicantId}
          switchApplicantType={this.switchApplicantType}
          onApplicantClick={this.selectApplicant}
          isSelectingFilters={isSelectingFilters}
          areFiltersApplied={areFiltersApplied}
          getAppliedFilters={this.getAppliedFilters}
          showFilterOptions={this.showFilterOptions}
          hideFilterOptions={this.hideFilterOptions}
          applyFilters={this.applyFilters}
          sortType={sortType}
          switchSortType={this.switchSortType}
          switchSortDirection={this.switchSortDirection}
          sortDirection={sortDirection}
          exportApplicants={this.exportApplicants}
        />
      </div>
    );
  }
}


AssessmentPageContainer.propTypes = {
  firestore: PropTypes.object,
};

export default compose(
  firebaseConnect(),
  firestoreConnect(),
  connect((state) => {
    return {
      firestore: state.firestore,
    };
  }),
)(AssessmentPageContainer);
