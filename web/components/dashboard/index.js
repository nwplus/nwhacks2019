import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const DashBoard = (props) => {
  const { application } = props;
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
  return {
    application,
  };
};

DashBoard.propTypes = {
  application: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(DashBoard);
