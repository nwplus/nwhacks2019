import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { HackerApplication } from '../../../components/application';
import { changeHackerApplicationPage, changeHackerApplicationLastValidIndex, addHackerApplication, ACTION_TYPES } from '../../../actions';
import propTypesTemplates from '../../../prop-types-templates';

export class HackerApplicationContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cancelled: false,
    };
  }

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

  cancel = () => {
    const { cancelApplication } = this.props;
    this.setState({ cancelled: true });
    cancelApplication();
  }

  render() {
    const { hackerApplication, activeIndex, lastValidIndex } = this.props;
    const { cancelled } = this.state;
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
        cancelHackerApplication={this.cancel}
        cancelled={cancelled}
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
    cancelApplication: () => {
      dispatch({ type: ACTION_TYPES.CANCEL_HACKER_APPLICATION });
    },
  };
};

HackerApplicationContainer.propTypes = {
  hackerApplication: propTypesTemplates.application.hacker,
  changePage: PropTypes.func.isRequired,
  changeLastActiveIndex: PropTypes.func.isRequired,
  activeIndex: PropTypes.number.isRequired,
  lastValidIndex: PropTypes.number.isRequired,
  updateApplication: PropTypes.func.isRequired,
  cancelApplication: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(HackerApplicationContainer);
