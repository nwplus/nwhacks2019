import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import { ApplicationContext } from '../../containers/application/Context';

const Application = (props) => {
  const { pages } = props;

  return (
    <ApplicationContext.Consumer>
      {
        (applicationProps) => {
          const { cancelled } = applicationProps;
          // const { application, cancelled } = applicationProps;

          // TODO: under feature flag
          // if (application.isSubmitted) return (<Redirect to="/dashboard" />);
          if (cancelled) return (<Redirect to="/" />);

          const { activeIndex } = applicationProps;
          return React.cloneElement(pages[activeIndex], applicationProps);
        }
      }
    </ApplicationContext.Consumer>
  );
};

Application.propTypes = {
  pages: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.array,
  ]),
};

export default Application;
