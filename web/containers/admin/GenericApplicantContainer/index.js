import React from 'react';
import PropTypes from 'prop-types';
import { firebaseConnect, firestoreConnect, isLoaded } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';
import flat from 'flat';
import update from 'immutability-helper';
import Axios from 'axios';
import { isEqual } from 'lodash';
import { Parser } from 'json2csv';
import { isNumeric } from '../../../util/string';
import { convertObjectPrimitivesToStrings } from '../../../util/object';

import AssessmentPage from '../../../components/admin/AssessmentPage';
import ApplicantsPage from '../../../components/admin/ApplicantsPage';
import applicantCollections from '../../../util/applicantCollections';

// contains logic for pages that involve managing applicants
class GenericApplicantContainer extends React.Component {
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
      // applicants with their checkbox checked
      checkedApplicantIds: {},
      isTagMenuOpen: false,
      searchText: '',
      NFCdevice: '',
    };
  }

  componentWillMount() {
    this.loadApplicants();
  }

  // choose when to rerender component
  shouldComponentUpdate(nextProps, nextState) {
    // console.log('shouldcomponentupdate');
    // rerender if state changes (default)
    if (!isEqual(nextState, this.state)) {
      return true;
    }
    const { applicantType, selectedApplicantId } = this.state;
    const { firestore, firebase, pageType } = this.props;
    // rerender if props.firebase (used for auth) changes or props.pageType changes
    if (!isEqual(firebase, nextProps.firebase) || !isEqual(pageType, nextProps.pageType)) {
      return true;
    }
    // on props.firestore change, only rerender if
    // - number of applicants change or
    // - selected applicant's data changes
    if (firestore && nextProps.firestore) {
      const shortInfoCollectionName = applicantCollections[applicantType].shortInfo;
      const applicants = firestore.data[shortInfoCollectionName] || {};
      const nextApplicants = nextProps.firestore.data[shortInfoCollectionName] || {};
      if (selectedApplicantId) {
        const applicant = applicants[selectedApplicantId];
        const nextApplicant = nextApplicants[selectedApplicantId];
        if (!isEqual(applicant, nextApplicant)) {
          return true;
        }
      }
      const applicantsKeys = Object.keys(applicants);
      const nextApplicantsKeys = Object.keys(nextApplicants);
      if (applicantsKeys.length !== nextApplicantsKeys.length) {
        return true;
      }
    }
    return false;
  }

  componentWillUnmount() {
    this.unloadApplicants();
  }

  // returns the currently applied filters
  getAppliedFilters = () => {
    const { appliedFilters } = this.state;
    return appliedFilters;
  }

  // returns tag menu options based on the currently checked applicants
  // TODO: make this a cloud function to avoid local storage inconsistencies
  // currently fetches directly from DB instead of local cache to avoid inconsistencies
  getTagMenuOptions = (callback) => {
    const { applicantType, checkedApplicantIds } = this.state;
    const { firestore } = this.props;
    const { store: { firestore: db } } = this.context;
    const shortInfoCollectionName = applicantCollections[applicantType].shortInfo;
    const { tags } = firestore.data;
    const numCheckedApplicants = Object.keys(checkedApplicantIds).length;
    const numTags = Object.keys(tags).length;
    // build initial empty tag options
    const tagOptions = {};
    Object.keys(tags).map(
      key => tagOptions[key] = null
    );
    db.collection(shortInfoCollectionName).get().then((docs) => {
      const applicants = {};
      docs.forEach(doc => applicants[doc.id] = doc.data());
      // update tagOptions through the iteration of checked applicants
      for (let i = 0; i < numCheckedApplicants; i += 1) {
        const applicantId = Object.keys(checkedApplicantIds)[i];
        const applicant = applicants[applicantId];
        for (let j = 0; j < numTags; j += 1) {
          const tagName = Object.keys(tagOptions)[j];
          const applicantHasTag = applicant.tags ? applicant.tags[tagName] : false;
          let tagOption = tagOptions[tagName];
          if (tagOption === null) {
            tagOption = { isChecked: applicantHasTag, isIndeterminate: false };
          }
          if (applicantHasTag && !tagOption.isChecked) {
            tagOption.isIndeterminate = true;
          } else if (!applicantHasTag && tagOption.isChecked) {
            tagOption.isChecked = false;
            tagOption.isIndeterminate = true;
          }
          tagOptions[tagName] = tagOption;
        }
      }
      callback(tagOptions);
    });
  }

  // retrieves filtered and sorted array of applicants
  getAllApplicants = () => {
    const {
      applicantType,
      sortType,
      sortDirection,
      searchText,
    } = this.state;
    const {
      firestore,
    } = this.props;
    const shortInfoCollectionName = applicantCollections[applicantType].shortInfo;
    const shortInfo = firestore.data[shortInfoCollectionName];
    if (shortInfo == null) {
      return undefined;
    }
    // this.setState({ applicantIndex: firestore.data[shortInfoCollectionName] });
    let applicants = Object.values(firestore.data[shortInfoCollectionName]);

    if (searchText !== '') {
      applicants = applicants.filter((applicant) => {
        applicant = flat(applicant, { delimiter: '_' });
        const fullName = applicant.firstName.toLowerCase() + ' ' + applicant.lastName.toLowerCase();
        return (fullName.includes(searchText)
          || applicant.email.toLowerCase().includes(searchText));
      });
    }

    const filteredApplicants = this.filterApplicants(applicants);
    let sortedApplicants = this.sortApplicants(sortType, filteredApplicants);
    if (sortDirection === 'desc') sortedApplicants = sortedApplicants.reverse();
    return sortedApplicants;
  }

  // handles selecting an applicant
  selectApplicant = (applicantId, applicantName) => {
    this.setState({ selectedApplicantId: applicantId });

    const { store: { firestore: db } } = this.context;
    const { NFCdevice, applicantType } = this.state;

    if (NFCdevice != null && NFCdevice !== '') {
      const deviceRef = db.collection('nfc_devices').doc(NFCdevice);
      deviceRef.update({
        writeId: applicantId,
        writeName: applicantName,
        writeApplicantType: applicantType,
      });
    }
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
      checkedApplicantIds: {},
    }, () => {
      this.loadApplicants(); // add listener for new applicantType's collections
      this.resetFilters();
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
  applyFilters = (newFilters, callback) => {
    const newFiltersExist = newFilters.length > 0;
    this.setState({
      isSelectingFilters: false,
      areFiltersApplied: newFiltersExist,
      appliedFilters: newFilters,
      filterExpression: this.compileFilters(newFilters),
      checkedApplicantIds: {},
    }, callback);
  }

  // reapply applied filters
  reapplyFilters = () => {
    const { appliedFilters } = this.state;
    this.resetFilters(() => this.applyFilters(appliedFilters));
  }

  // removes any applied filters
  resetFilters = (callback) => {
    this.applyFilters([], callback);
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
      const { selectedField, selectedOperator } = filter;
      let { selectedValue } = filter;
      selectedValue = isNumeric(selectedValue) ? Number(selectedValue) : `"${selectedValue}"`;
      const conditional = `applicant["${selectedField}"]${selectedOperator}${selectedValue}`;
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
          if (a.score.finalScore === b.score.finalScore) {
            // if equal scores, break tie by timestamp
            if (!a.timestamp) return -1;
            if (!b.timestamp) return 1;
            if (a.timestamp > b.timestamp) return 1;
            if (a.timestamp < b.timestamp) return -1;
          }
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

  // checks all applicants (adds all applicants to this.state.checkedApplicantIds)
  checkAllApplicants = () => {
    const applicants = this.getAllApplicants() || [];
    const checkedApplicantIds = {};
    for (let i = 0; i < applicants.length; i += 1) {
      const applicantId = applicants[i].id;
      checkedApplicantIds[applicantId] = true;
    }
    this.setState({ checkedApplicantIds });
  }

  // unchecks all applicants (empties this.state.checkedApplicantIds)
  uncheckAllApplicants = () => {
    this.setState({ checkedApplicantIds: {} });
  }

  // checks a given applicant (adds applicant to this.state.checkedApplicantIds)
  checkApplicant = (applicantId) => {
    const newState = update(this.state, {
      checkedApplicantIds: {
        [applicantId]: {
          $set: true,
        },
      },
    });
    this.setState(newState);
  }

  // unchecks a given applicant (removes applicant from this.state.checkedApplicantIds)
  uncheckApplicant = (applicantId) => {
    const { checkedApplicantIds: { [applicantId]: deletedValue, ...rest } } = this.state;
    this.setState({ checkedApplicantIds: rest });
  }

  // shows/hides tag menu
  toggleTagMenu = () => {
    const { isTagMenuOpen, isApplyingTags, checkedApplicantIds } = this.state;
    if (Object.keys(checkedApplicantIds).length !== 0) {
      this.setState({
        isTagMenuOpen: !isTagMenuOpen,
        isApplyingTags: !isApplyingTags,
        tagOptions: null,
      });
    } else {
      this.setState({
        isTagMenuOpen: false,
        isApplyingTags: false,
        tagOptions: null,
      });
    }
  }

  // creates a new tag, and returns the name of the tag if successfully created
  createNewTag = (tagName) => {
    const { store } = this.context;
    const { firestore: db } = store;
    const { firestore } = this.props;
    const { tags } = firestore.data;
    if (tagName !== '' && tagName != null && tags[tagName] === undefined) {
      tagName = tagName.trim().replace(/ /g, '-').toLowerCase();
      db.collection('tags').doc(tagName).set({});
      return tagName;
    }
    return null;
  }

  applyTags = (tagOptions, onSuccess, onFail) => {
    const { firebase } = this.props;
    const { applicantType, checkedApplicantIds } = this.state;
    const tagsToAdd = [];
    const tagsToRemove = [];
    Object.keys(tagOptions).forEach((tagName) => {
      const tagOption = tagOptions[tagName];
      if (!tagOption.isIndeterminate) {
        if (tagOption.isChecked) {
          tagsToAdd.push(tagName);
        } else {
          tagsToRemove.push(tagName);
        }
      }
    });
    firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(idToken => Axios.post(
      firebase.nwUtils.getFunctionUrl('tagApplicants'),
      {
        applicantType,
        applicants: Object.keys(checkedApplicantIds),
        tagsToAdd,
        tagsToRemove,
      },
      {
        headers: {
          'Content-Type': 'text/plain',
          Authorization: idToken,
        },
      }
    ).then((res) => {
      if (res.status === 200) {
        this.reapplyFilters();
        onSuccess();
      } else {
        onFail();
      }
    }).catch(() => onFail()));
  }

  exportApplicants = () => {
    const { checkedApplicantIds } = this.state;
    const checkedApplicants = [];
    const applicants = this.getAllApplicants();
    applicants.forEach((applicant) => {
      if (checkedApplicantIds[applicant.id]) {
        checkedApplicants.push(applicant);
      }
    });
    const filteredApplicants = this.filterApplicants(checkedApplicants);
    const fields = ['firstName', 'lastName', 'email', 'id'];
    // https://www.npmjs.com/package/json2csv

    // Flatten each applicant
    const flattenedApplicants = [];
    for (let i = 0; i < filteredApplicants.length; i += 1) {
      const applicant = flat(filteredApplicants[i], { delimiter: '.' });
      flattenedApplicants.push(applicant);
    }

    // Export all the fields of each applicant
    for (let j = 0; j < flattenedApplicants.length; j += 1) {
      const applicantKeys = Object.keys(flattenedApplicants[j]);
      for (let k = 0; k < applicantKeys.length; k += 1) {
        const applicantField = applicantKeys[k];
        if (!fields.includes(applicantField)) {
          fields.push(applicantField);
        }
      }
    }

    // Export to CSV
    const json2csvParser = new Parser({ fields });
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

  searchApplicants = (newSearchText) => {
    this.setState({ searchText: newSearchText });
  }

  switchNFCdevice = (newNFCdevice) => {
    this.setState({ NFCdevice: newNFCdevice });
  }

  renderAssessmentPage = () => {
    const {
      applicantType,
      selectedApplicantId,
      isSelectingFilters,
      areFiltersApplied,
      sortType,
      sortDirection,
    } = this.state;

    const applicants = this.getAllApplicants();

    if (!isLoaded(applicants)) {
      return (<span>Loading...</span>);
    }

    return (
      <div>
        <AssessmentPage
          applicantType={applicantType}
          applicants={applicants}
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
          searchApplicants={this.searchApplicants}
          switchNFCdevice={this.switchNFCdevice}
        />
      </div>
    );
  }

  renderApplicantsPage = () => {
    const {
      applicantType,
      selectedApplicantId,
      isSelectingFilters,
      areFiltersApplied,
      sortType,
      sortDirection,
      checkedApplicantIds,
      isTagMenuOpen,
    } = this.state;

    const applicants = this.getAllApplicants();

    if (!isLoaded(applicants)) {
      return (<span>Loading...</span>);
    }

    return (
      <div>
        <ApplicantsPage
          applicantType={applicantType}
          applicants={applicants}
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
          checkAllApplicants={this.checkAllApplicants}
          uncheckAllApplicants={this.uncheckAllApplicants}
          checkApplicant={this.checkApplicant}
          uncheckApplicant={this.uncheckApplicant}
          toggleTagMenu={this.toggleTagMenu}
          isTagMenuOpen={isTagMenuOpen}
          getTagMenuOptions={this.getTagMenuOptions}
          checkedApplicantIds={checkedApplicantIds}
          createNewTag={this.createNewTag}
          applyTags={this.applyTags}
          exportApplicants={this.exportApplicants}
          searchApplicants={this.searchApplicants}
          switchNFCdevice={this.switchNFCdevice}
        />
      </div>
    );
  }

  render() {
    const { pageType } = this.props;
    switch (pageType) {
      case 'assessment':
        return this.renderAssessmentPage();
      default:
      case 'applicants':
        return this.renderApplicantsPage();
    }
  }
}

GenericApplicantContainer.propTypes = {
  firestore: PropTypes.object,
  firebase: PropTypes.object,
  pageType: PropTypes.string, // 'assessment' or 'applicants'
};

export default compose(
  firebaseConnect(),
  firestoreConnect(),
  connect((state) => {
    return {
      firestore: state.firestore,
    };
  }),
)(GenericApplicantContainer);
