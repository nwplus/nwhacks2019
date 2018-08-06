import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import { ProgressGroup } from '../../input/buttons';

const HackerApplication = (props) => {
  const { hackerApplication } = props;
  if (!hackerApplication.isLoaded) return (<div />);
  if (hackerApplication.data) return (<Redirect to="/dashboard" />);

  const { count, activeIndex, lastValidIndex } = props;
  return (
    <div className="below-nav">
      <p>o hello there pls apply</p>
      <ProgressGroup
        count={count}
        activeIndex={activeIndex}
        lastValidIndex={lastValidIndex}
        />
    </div>
  );
};

HackerApplication.propTypes = {
  hackerApplication: PropTypes.object.isRequired,
};

export default HackerApplication;
