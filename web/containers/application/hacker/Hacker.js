import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { HackerApplication } from '../../../components/application';
import { changeHackerApplicationPage, changeHackerApplicationLastValidIndex } from '../../../actions';

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
  };
};

HackerApplicationContainer.propTypes = {
  hackerApplication: PropTypes.object,
  changePage: PropTypes.func.isRequired,
  changeLastActiveIndex: PropTypes.func.isRequired,
  activeIndex: PropTypes.number.isRequired,
  lastValidIndex: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(HackerApplicationContainer);
