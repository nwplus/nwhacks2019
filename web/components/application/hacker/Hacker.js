import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import PageOne from './pages/PageOne';
import PageTwo from './pages/PageTwo';
import SignUp from './pages/SignUp';

import propTypesTemplates from '../../../prop-types-templates';

import { HackerApplicationContext } from '../../../containers/application/hacker/Context'

const HackerApplication = (props) => {
  const { hackerApplication, cancelled } = props;
  if (hackerApplication.isSubmitted) return (<Redirect to="/dashboard" />);
  if (cancelled) return (<Redirect to="/" />);

  const indexToPage = {
    0: (
      <PageOne />
    ),
    1: (
      <PageTwo />
    ),
    2: (
      <SignUp />
    ),
  };

  return (
    <HackerApplicationContext.Consumer>
      {
        (hackerApplicationProps) => {
          const { activeIndex } = hackerApplicationProps;
          return React.cloneElement(indexToPage[activeIndex], hackerApplicationProps)
        }
      }
    </HackerApplicationContext.Consumer>
  );

  // return (<div>{children[0]}</div>)

  // return (
  //   <HackerApplicationContext.Consumer>
  //     {
  //       (hackerApplicationProps) => {
  //         const childrenWithProps = React.Children.map(children, child =>
  //           React.cloneElement(child, hackerApplicationProps));
  //         return (<div>{childrenWithProps[0]}</div>)
  //       }
  //     }
  //   </HackerApplicationContext.Consumer>
  // );
};

HackerApplication.propTypes = {
  hackerApplication: propTypesTemplates.application.hacker,
  count: PropTypes.number,
  activeIndex: PropTypes.number,
  lastValidIndex: PropTypes.number,
  onPageChange: PropTypes.func,
  onPageBack: PropTypes.func,
  onPageNext: PropTypes.func,
  onHackerApplicationChange: PropTypes.func,
  cancelHackerApplication: PropTypes.func.isRequired,
  cancelled: PropTypes.bool.isRequired,
  isNextButtonEnabled: PropTypes.bool.isRequired,
  updateNextButtonState: PropTypes.func.isRequired,
  submitApplication: PropTypes.func.isRequired,
};

export default HackerApplication;
