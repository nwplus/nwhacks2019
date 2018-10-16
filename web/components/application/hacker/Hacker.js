import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import { HackerApplicationContext } from '../../../containers/application/hacker/Context';

const HackerApplication = (props) => {
  const { pages } = props;

  return (
    <HackerApplicationContext.Consumer>
      {
        (hackerApplicationProps) => {
          const { hackerApplication, cancelled } = hackerApplicationProps;

          if (hackerApplication.isSubmitted) return (<Redirect to="/dashboard" />);
          if (cancelled) return (<Redirect to="/" />);

          const { activeIndex } = hackerApplicationProps;
          return React.cloneElement(pages[activeIndex], hackerApplicationProps);
        }
      }
    </HackerApplicationContext.Consumer>
  );
};

HackerApplication.propTypes = {
  pages: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.array,
  ]),
};

export default HackerApplication;
