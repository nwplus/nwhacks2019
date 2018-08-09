import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const DashBoard = (props) => {
  const { hackerApplication } = props;
  let content;

  if (hackerApplication.data) {
    content = 'you have one hacker application';
  } else {
    content = 'you didn\'t apply as hacker';
  }

  return (<div className="pad-nav">{content}</div>);
};

const mapStateToProps = (state) => {
  const { root: { hackerApplication } } = state;
  return {
    hackerApplication,
  };
};

DashBoard.propTypes = {
  hackerApplication: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(DashBoard);
