import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { HackerApplication } from '../../../components/application';
import { changeHackerApplicationPage, changeHackerApplicationLastValidIndex, addHackerApplication } from '../../../actions';
import propTypes from '../../../prop-types';

export class HackerApplicationContainer extends React.Component {
  onPageChange = (activeIndex) => {
    const { changePage, changeLastActiveIndex, lastValidIndex } = this.props;
    changePage(activeIndex);
    if (activeIndex > lastValidIndex) {
      changeLastActiveIndex(activeIndex);
    }
  }

  onPageNext = () => {
    const { activeIndex } = this.props;
    const nextIndex = activeIndex + 1;
    this.onPageChange(nextIndex);
  }

  onPageBack = () => {
    const { activeIndex } = this.props;
    const nextIndex = activeIndex - 1;
    this.onPageChange(nextIndex);
  }

  onHackerApplicationChange = (app) => {
    const { updateApplication } = this.props;
    updateApplication(app);
  }

  render() {
    const { hackerApplication, activeIndex, lastValidIndex } = this.props;
    return (
      <HackerApplication
        hackerApplication={hackerApplication}
        activeIndex={activeIndex}
        lastValidIndex={lastValidIndex}
        count={4}
        onPageChange={this.onPageChange}
        onPageNext={this.onPageNext}
        onPageBack={this.onPageBack}
        onHackerApplicationChange={this.onHackerApplicationChange}
        />
    );
  }
}

const mapStateToProps = (state) => {
  const {
    root: {
      entities: {
        application: {
          hacker: hackerApplication,
        },
      },
      ui: {
        application: {
          hacker: {
            activeIndex,
            lastValidIndex,
          },
        },
      },
    },
  } = state;

  return {
    hackerApplication,
    activeIndex,
    lastValidIndex,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changePage: (page) => {
      dispatch(changeHackerApplicationPage(page));
    },
    changeLastActiveIndex: (index) => {
      dispatch(changeHackerApplicationLastValidIndex(index));
    },
    updateApplication: (app) => {
      dispatch(addHackerApplication(app));
    },
  };
};

HackerApplicationContainer.propTypes = {
  hackerApplication: propTypes.application.hacker,
  changePage: PropTypes.func.isRequired,
  changeLastActiveIndex: PropTypes.func.isRequired,
  activeIndex: PropTypes.number.isRequired,
  lastValidIndex: PropTypes.number.isRequired,
  updateApplication: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(HackerApplicationContainer);
