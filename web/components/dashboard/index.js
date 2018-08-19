import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

const DashBoard = (props) => {
  const { application, loggedIn } = props;

  if (!loggedIn) return (<Redirect to="page_not_found" />);

  let content;

  if (application.hacker.isSubmitted) {
    content = 'you have one hacker application';
  } else {
    content = 'you didn\'t apply as hacker';
  }

  return (<div className="pad-nav">{content}</div>);
};

const mapStateToProps = (state) => {
  const { root: { entities: { application } } } = state;
  const { isEmpty } = state.firebase.auth;

  return {
    application,
    loggedIn: !isEmpty,
  };
};

DashBoard.propTypes = {
  application: PropTypes.object.isRequired,
  loggedIn: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps)(DashBoard);
