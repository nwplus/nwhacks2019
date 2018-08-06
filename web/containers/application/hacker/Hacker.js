import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { HackerApplication } from '../../../components/application';

class HackerApplicationContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
      lastValidIndex: 0,
      count: 4,
    };
  }

  onPageChange = (activeIndex) => {
    this.setState({ activeIndex });
    const { lastValidIndex } = this.state;
    if (activeIndex > lastValidIndex) {
      this.setState({ lastValidIndex: activeIndex });
    }
  }

  onPageNext = () => {
    const { activeIndex } = this.state;
    const nextIndex = activeIndex + 1;
    this.onPageChange(nextIndex);
  }

  onPageBack = () => {
    const { activeIndex } = this.state;
    const nextIndex = activeIndex - 1;
    this.onPageChange(nextIndex);
  }

  render() {
    const { hackerApplication } = this.props;
    const { activeIndex, lastValidIndex, count } = this.state;
    return (
      <HackerApplication
        hackerApplication={hackerApplication}
        activeIndex={activeIndex}
        lastValidIndex={lastValidIndex}
        count={count}
        onPageChange={this.onPageChange}
        onPageNext={this.onPageNext}
        onPageBack={this.onPageBack}
        />
    );
  }
}

const mapStateToProps = (state) => {
  const { root: { hackerApplication } } = state;
  return {
    hackerApplication,
  };
};

HackerApplicationContainer.propTypes = {
  hackerApplication: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(HackerApplicationContainer);
